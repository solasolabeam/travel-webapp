
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import KakaoProvider from 'next-auth/providers/kakao';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Session, User } from "next-auth";
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';


// NextAuth 옵션
export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECERT,
  providers: [
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드 
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "example@example.com" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          console.log('자격 증명이 제공되지 않았거나 이메일/비밀번호가 없습니다.');
          return null;
        }

        const db = (await connectDB).db('trip');
        const user = await db.collection('user_cred').findOne({ email: credentials.email })
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return {
          id: user._id.toString(),
          name: user.name || 'User', // name이 없는 경우 기본값 제공
          email: user.email,
          image: user.image, // 이미지가 없으면 null 반환
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),

  ],
  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일
  },
  
  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }: { token: JWT, user: User }) => {
      if (user) {
        token.user = {
          name: user.name ?? undefined, // null 또는 undefined일 경우 undefined로 할당
          email: user.email ?? undefined, // null 또는 undefined일 경우 undefined로 할당
          image: user.image ?? undefined // null 또는 undefined일 경우 undefined로 할당
        };
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }: { session: Session, token: JWT }) => {
      session.user = token.user ?? undefined;
      return session;
    },
  },
};

// NextAuth API 경로 설정
export default NextAuth(authOptions);