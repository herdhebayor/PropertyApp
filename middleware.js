export {default} from "next-auth/middleware";// Protect all routes including localhost:3000/api/...

export const config = {
  matcher: ["/properties/add","/profile","/properties/saved","/messages"],
}; //Specify protected routes