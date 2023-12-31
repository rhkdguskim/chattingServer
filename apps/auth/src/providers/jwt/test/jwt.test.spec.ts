import { JwtServiceImpl } from "@app/auth/providers/jwt/jwtServiceImpl";

describe("JwtService Test", () => {
  const jwtService = new JwtServiceImpl({
    expire_in: "5s",
    secret: "test",
  });

  it("Class", () => {
    expect(jwtService).toBeInstanceOf(JwtServiceImpl);
  });

  it("Function", async () => {
    const token = await jwtService.sign({
      id: 0,
      role: 0,
      user_id: "test",
    });
    const acc_data = await jwtService.verify(token.access_token);
    const refresh_data = await jwtService.verify(token.refresh_token);
    expect(acc_data.id).toEqual(0);
    expect(acc_data.user_id).toEqual("test");

    expect(refresh_data.id).toEqual(0);
    expect(refresh_data.user_id).toEqual("test");
  });
});
