import {CommonJwtService} from "@app/common/auth/common.jwtService";

describe("JwtService Test",  () => {
    const jwtService = new CommonJwtService({
        expire_in: "5s", secret: "test"
    })

    it("Class", () => {
        expect(jwtService).toBeInstanceOf(CommonJwtService)

    })

    it("Function", async () => {
        const token = await jwtService.sign({id: 0, refresh_token: false, user_id: "test"})
        const acc_data = await jwtService.verify(token.access_token)
        const refresh_data = await jwtService.verify(token.refresh_token)
        expect(acc_data.id).toEqual(0)
        expect(acc_data.user_id).toEqual("test")

        expect(refresh_data.id).toEqual(0)
        expect(refresh_data.user_id).toEqual("test")
    })
})