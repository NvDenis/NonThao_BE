import jwt from "jsonwebtoken";

export const CreateAccessToken = (user) => {
  return jwt.sign(
    {
      userInfo: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

export const CreateRefreshToken = (res, userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7 days",
  });
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${refreshToken}; Path=/; HttpOnly; Max-Age=${
      7 * 24 * 60 * 60
    }; SameSite=None; Secure; Partitioned`
  );
};
