// import Link from "next/link";

// export default function Page() {
//   return (
//     <div className="m-4 bg-primary-700 flex items-center justify-center rounded-lg">
//       <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
//         {/* Logo and App Name */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-primary-50">SignIn</h1>
//         </div>

//         {/* Login Form */}
//         <form className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-primary-200"
//             >
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               required
//               className="w-full p-2.5 bg-primary-800 text-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-primary-200"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               required
//               className="w-full p-2.5 bg-primary-800 text-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full bg-accent-500 p-3 rounded-md text-primary-50 font-semibold hover:bg-accent-600"
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         {/* Switch to Signup */}
//         <p className="mt-6 text-sm text-primary-100 text-center">
//           Don't have an account?{" "}
//           <Link href="/signup">
//             <span className="text-accent-400 hover:underline">
//               Sign up here.
//             </span>
//           </Link>
//         </p>

//         {/* Social Login (optional for now) */}
//         <div className="mt-6">
//           <button className="w-full p-3 rounded-md bg-primary-800 text-primary-50 hover:bg-primary-600">
//             Continue with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

export default function Page() {
  return (
    <div className="m-4 bg-primary-700 flex items-center justify-center rounded-lg">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
        {/* Logo and App Name */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-50">Sign In</h1>
        </div>

        {/* Social Login */}
        <div className="space-y-6">
          <button className="w-full p-3 rounded-md bg-accent-500 text-primary-50 font-semibold hover:bg-accent-600">
            Continue with Google
          </button>
        </div>

        {/* Switch to Signup */}
        {/* <p className="mt-6 text-sm text-primary-100 text-center">
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="text-accent-400 hover:underline">
              Sign up here.
            </span>
          </Link>
        </p> */}
      </div>
    </div>
  );
}
