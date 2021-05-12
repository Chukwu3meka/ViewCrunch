import cookie from "js-cookie";
import Router from "next/router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { Handle } from ".";
import userControl from "@utils/userControl";
import firebase from "@utils/firebaseClient";
import { fetcher } from "@utils/clientFunctions";
import { setProfileAction } from "@store/actions";
import { fetchProfile } from "@utils/firestoreFetch";

const firebaseAuthConfig = ({ setAuthDetail }) => ({
  signInFlow: "popup",

  signInOptions: [
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: ["public_profile"],
      requireDisplayName: true,
    },
  ],
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: ({
      user: { uid, displayName, refreshToken: myRefresh },
      additionalUserInfo: {
        isNewUser,
        profile: {
          picture: {
            data: { url: photoURL },
          },
        },
      },
    }) => {
      if (myRefresh) {
        setAuthDetail({
          photoURL,
          displayName,
          isNewUser,
          myRefresh,
          uid,
        });
      }
      return false;
    },
  },
});

const AuthFirebase = (props) => {
  const { logout } = userControl(),
    [online, setOnline] = useState(false),
    [authDetail, setAuthDetail] = useState({}),
    [renderAuth, setRenderAuth] = useState(false),
    [chooseHandle, setChooseHandle] = useState(false),
    [authenticated, setAuthenticated] = useState(props.authenticated);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
    return () => setRenderAuth(false);
  }, []);

  useEffect(() => {
    setAuthenticated(!!props.authenticated);
  }, [props.authenticated]);

  useEffect(() => {
    if (authDetail.myRefresh && authDetail.uid && online) {
      const finalizeSignIn = async () => {
        if (authDetail.isNewUser) {
          await fetcher(
            "/api/profile/initProfile",
            JSON.stringify({
              uid: authDetail.uid,
              handle: `ViewCrunch_new-user_${authDetail.displayName}`,
              photoURL: authDetail.photoURL,
            })
          );
          setChooseHandle(true);
        } else {
          const handle = firebase.auth().currentUser.displayName;
          if (handle?.startsWith("@")) {
            const profile = await fetchProfile(handle);
            if (profile) {
              const viewer = {
                myHandle: handle,
                myTheme: profile.theme,
                myProfession: profile.profession,
                myDisplayName: profile.displayName,
                myNotification: profile.notification,
                myCoverPicture: profile.coverPicture,
                myProfilePicture: profile.profilePicture,
              };

              await cookie.set("ViewCrunch", authDetail.myRefresh, {
                expires: 183,
                path: "",
              });

              await props.setProfileAction({ ...viewer });
              // Router.reload();
            }
          }

          if (handle?.startsWith("ViewCrunch_new-user_")) {
            setChooseHandle(true);
          }
        }
      };

      finalizeSignIn();
    }
  }, [authDetail.myRefresh]);

  if (chooseHandle && online && authDetail?.uid) return <Handle myRefresh={authDetail.myRefresh} />;

  return (
    <div>
      {online ? (
        renderAuth && !authenticated ? (
          <StyledFirebaseAuth uiConfig={firebaseAuthConfig({ setAuthDetail })} firebaseAuth={firebase.auth()} />
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              props.setProfileAction({});
              logout();
            }}>
            Logout
          </Button>
        )
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
    online: state.device?.online,
    authenticated: state.profile?.myHandle,
  }),
  mapDispatchToProps = {
    setProfileAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(AuthFirebase);
