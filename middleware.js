//export {default} from "next-auth/middleware";// Protect all routes including localhost:3000/api/...

export default {
  matcher: ["/properties/add","/profile","/properties/saved","/messages"],
}; //Specify protected routes