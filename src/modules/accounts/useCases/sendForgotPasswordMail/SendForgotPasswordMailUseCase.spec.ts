/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayJsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider,
        );
    });

    it("Should be able to send a forgot password mail to a user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        await usersRepositoryInMemory.create({
            driver_license: "5556",
            email: "fake@email.org",
            name: "xereswaldo",
            password: "123"
        });

        await sendForgotPasswordMailUseCase.execute("fake@email.org");

        expect(sendMail).toHaveBeenCalled()
    });

    it("Should not be able to send a email if user does not exists.", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("doesNot@email.com")
        ).rejects.toEqual({ "message": "User does not exists..", "statusCode": 400 });
    });

    it("Should be able to create an users token", async () => {
        const genereteTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "52432556",
            email: "f2ake@email.org",
            name: "xere333333swaldo",
            password: "144423"
        });

        await sendForgotPasswordMailUseCase.execute("f2ake@email.org");

        expect(genereteTokenMail).toBeCalled()
    })
});
