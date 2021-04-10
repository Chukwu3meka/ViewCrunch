// import cookie from "js-cookie";
// import Router from "next/router";
// import { connect } from "react-redux";
// import { useEffect, useState } from "react";
// import Button from "@material-ui/core/Button";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// import { Handle } from "/";
// import userControl from "@utils/userControl";
// import firebase from "@utils/firebaseClient";
// import { setProfileAction } from "@store/actions";
// import { fetchProfile } from "@utils/firestoreFetch";

// const firebaseAuthConfig = ({ setAuthDetail }) => ({
//   signInFlow: "popup",
//   signInOptions: [
//     {
//       provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       scopes: ["public_profile"],
//       requireDisplayName: true,
//     },
//   ],
//   credentialHelper: "none",
//   callbacks: {
//     signInSuccessWithAuthResult: async ({
//       user: { uid, displayName, refreshToken: myRefresh },
//       additionalUserInfo: {
//         isNewUser,
//         profile: {
//           picture: {
//             data: { url: photoURL },
//           },
//         },
//       },
//     }) => {
//       if (myRefresh) {
//         setAuthDetail({
//           photoURL,
//           displayName,
//           isNewUser,
//           myRefresh,
//           uid,
//         });
//       }
//       return false;
//     },
//   },
// });

// const AuthFirebase = (props) => {
//   const { logout } = userControl(),
//     [online, setOnline] = useState(false),
//     [authDetail, setAuthDetail] = useState({}),
//     [renderAuth, setRenderAuth] = useState(false),
//     [chooseHandle, setChooseHandle] = useState(false);

//   useEffect(() => {
//     setOnline(props.online);
//   }, [props.online]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setRenderAuth(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (authDetail.myRefresh && authDetail.uid && online) {
//       const finalizeSignIn = async () => {
//         if (authDetail.isNewUser) {
//           await fetcher(
//             "/api/profile/initProfile",
//             JSON.stringify({
//               uid: authDetail.uid,
//               handle: `viewChest_new-user_${authDetail.displayName}`,
//               photoURL: authDetail.photoURL,
//             })
//           );
//           setChooseHandle(true);
//         } else {
//           const handle = await getHandleViaRefresh(authDetail.myRefresh);
//           // setAuthDetail({ ...authDetail, myHandle: handle });

//           if (handle?.startsWith("@")) {
//             const profile = await fetchProfile(handle);
//             if (profile) {
//               const viewer = {
//                 myProfilePicture: profile.profilePicture,
//                 myCoverPicture: profile.coverPicture,
//                 myHandle: handle,
//                 myDisplayName: profile.displayName,
//                 myProfession: profile.profession,
//                 myNotification: profile.notification,
//                 myTheme: profile.theme,
//               };

//               await cookie.set("viewChest", authDetail.myRefresh, {
//                 expires: 183,
//                 path: "",
//               });

//               await props.setProfileAction({ ...viewer });
//               Router.reload();
//             }
//           } else {
//             setChooseHandle(true);
//           }
//         }
//       };

//       finalizeSignIn();
//     }
//   }, [authDetail.myRefresh]);

//   if (chooseHandle && online && authDetail?.uid) return <Handle myRefresh={authDetail.myRefresh} />;

//   return (
//     <div>
//       {online ? (
//         renderAuth && !props.loggedIn ? (
//           <StyledFirebaseAuth uiConfig={firebaseAuthConfig({ setAuthDetail })} firebaseAuth={firebase.auth()} />
//         ) : (
//           <Button
//             size="small"
//             variant="outlined"
//             color="secondary"
//             onClick={async () => {
//               logout();
//               await props.setProfileAction({});
//             }}>
//             Logout
//           </Button>
//         )
//       ) : null}
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//     online: state.device?.online,
//     loggedIn: state.profile?.myHandle,
//   }),
//   mapDispatchToProps = {
//     setProfileAction,
//   };

// export default connect(mapStateToProps, mapDispatchToProps)(AuthFirebase);
export default () => "authentication disabled temporarily";
