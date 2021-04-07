import { ErrorPage } from "@component/page";
import NotificationContainer from "@component/notification";
import { fetchAuthorData } from "@utils/firestoreFetch";

const Index = ({ notification, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <NotificationContainer notification={notification} />;
};

export default Index;

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { extractHandle, errorProp, connected } = require("@utils/serverFunctions");
  // const noNetwork = !(await connected);
  // if (noNetwork) return errorProp(400, "Network connectivity issue");

  // const { myAuthorID } = await extractHandle("cookiePedroView", cookie);
  // if (!myAuthorID) return errorProp(400, "User not logged in");

  // const {notification} = await fetchAuthorData(myAuthorID);
  const notification = [
    {
      title: "Eu aliquip fugiat eu incididunt eu dolore excepteur aute sit consequat proident in cillum dolor.",
      link: "/",
      body:
        "Fugiat laboris non adipisicing excepteur aliquip sint velit esse nisi aute. Magna velit laboris ex velit officia. Sunt officia eu proident elit laboris ullamco aute. Dolore ad excepteur officia consequat.",
    },
    {
      title: "Laborum eu voluptate eu quis fugiat adipisicing cillum reprehenderit cillum et reprehenderit.",
      link: "/",
      body:
        "Proident excepteur ea cupidatat laboris labore id qui ea excepteur occaecat incididunt incididunt sit aliqua. Labore commodo pariatur veniam laborum. Nostrud dolor voluptate eiusmod occaecat aliquip nulla dolor laboris nulla consequat nisi. Excepteur labore sint cillum aliquip elit est cillum incididunt magna consequat non veniam. Voluptate laboris in consequat laborum adipisicing.",
    },
    {
      title: "Do et eiusmod dolore sit commodo.",
      link: "/",
      body:
        "Anim consectetur sit dolor pariatur dolor sint nulla. Esse tempor reprehenderit occaecat do amet magna in sit minim do nisi fugiat. Commodo consequat culpa ea veniam et ipsum. Sunt esse fugiat et cillum nisi tempor nostrud ad labore ut in tempor elit. Quis fugiat anim dolore labore sit do excepteur reprehenderit pariatur cupidatat velit laborum adipisicing velit.",
    },
    {
      title: "Adipisicing enim ipsum sunt in occaecat nulla sit proident anim.",
      link: "/",
      body:
        "Consequat Lorem nulla in sint. Ut magna laborum mollit nisi velit excepteur officia irure aute amet. Laboris nisi consectetur Lorem voluptate eiusmod nisi officia cupidatat dolor sint ullamco eiusmod. Adipisicing nisi non pariatur duis anim amet occaecat. Dolore proident duis sit do voluptate sunt proident consequat. Nostrud aliqua tempor nulla ex culpa qui laborum. Nisi elit irure cillum nisi ea ut excepteur qui culpa consectetur.",
    },
    {
      title: "Quis laborum occaecat fugiat nisi minim proident consectetur commodo qui nostrud culpa.",
      link: "/",
      body:
        "Anim eu cupidatat mollit labore minim in. Commodo consectetur proident laborum excepteur. Adipisicing qui eiusmod ad exercitation culpa laborum pariatur laborum reprehenderit laborum eiusmod aliquip magna veniam. Elit est mollit tempor pariatur aliqua consequat mollit esse tempor nisi quis. Esse mollit tempor do eiusmod commodo deserunt ex eu.",
    },
    {
      title: "Officia est labore culpa et mollit fugiat.",
      link: "/",
      body:
        "Sit cillum tempor sunt commodo esse labore. Dolor in elit ad ex eiusmod nulla proident esse commodo commodo cillum exercitation exercitation. Qui voluptate sunt elit magna exercitation occaecat laboris adipisicing ipsum occaecat pariatur. Eu eiusmod et aliqua fugiat laborum adipisicing officia nostrud. Tempor Lorem est non reprehenderit non laborum dolore incididunt ut. Irure consectetur ut non tempor ullamco cillum ea fugiat esse deserunt velit qui qui. Elit officia excepteur sint sint.",
    },
    {
      title: "Sunt duis est pariatur eiusmod esse eiusmod eiusmod eu.",
      link: "/",
      body:
        "Incididunt exercitation fugiat do irure eiusmod ex cillum nisi aliqua in magna nulla do. Cillum occaecat sit cupidatat ex. Do irure sint esse ad labore tempor et. Amet fugiat do id quis commodo esse proident consequat in magna sit pariatur nisi proident.",
    },
    {
      title: "Sunt non officia exercitation amet.",
      link: "/",
      body:
        "Nulla quis consectetur incididunt elit duis id aute est consequat est mollit. Tempor Lorem dolore laboris elit ullamco Lorem irure pariatur. Voluptate quis eu amet cillum ea ut non.",
    },
    {
      title: "Ad consectetur sit ad eiusmod Lorem labore excepteur cupidatat duis et culpa nulla nulla pariatur.",
      link: "/",
      body:
        "Occaecat ea dolore minim excepteur pariatur ad ut irure tempor enim velit fugiat officia. Officia in nostrud quis reprehenderit. Eiusmod deserunt incididunt cupidatat aliquip amet proident enim quis. Voluptate eu mollit ex deserunt laboris ex. Reprehenderit non do cupidatat ullamco amet adipisicing incididunt ad.",
    },
    {
      title: "In minim laboris ut mollit excepteur laboris adipisicing ut non.",
      link: "/",
      body:
        "Consectetur esse reprehenderit incididunt id sint laborum minim eiusmod tempor mollit et cillum non. Aliqua cillum pariatur minim pariatur exercitation ad. Fugiat elit amet elit Lorem non cupidatat laboris veniam culpa nostrud occaecat eu sunt. Eu adipisicing dolore proident proident eiusmod culpa sunt cillum.",
    },
    {
      title: "Eiusmod in proident mollit ex incididunt officia voluptate fugiat laborum magna duis sit.",
      link: "/",
      body:
        "Aliquip cupidatat consequat dolor quis aliquip labore est laboris nisi culpa. Esse anim enim nulla enim ullamco ex commodo velit ullamco. Ex labore reprehenderit anim laborum ipsum magna. Exercitation incididunt tempor dolor aute irure id anim proident ad veniam sit et quis. Voluptate ut qui adipisicing do non non. Mollit ad deserunt magna consectetur non sint. Ea consequat nulla duis minim.",
    },
    {
      title: "Cupidatat ut et enim consectetur pariatur pariatur irure occaecat.",
      link: "/",
      body:
        "Sunt elit eu aute elit adipisicing ea ex. Nulla anim consequat consectetur ipsum id reprehenderit deserunt officia est. Consequat adipisicing tempor dolor irure amet esse cupidatat tempor cillum nisi est. Incididunt esse ut in exercitation minim. Enim ipsum eiusmod anim cupidatat labore incididunt minim.",
    },
    {
      title: "Do veniam laboris nulla officia duis incididunt deserunt reprehenderit nulla adipisicing occaecat adipisicing.",
      link: "/",
      body:
        "Magna commodo et laboris qui occaecat sunt id ipsum. Deserunt labore duis ad quis eu ipsum officia excepteur. Est incididunt excepteur nisi commodo proident sit. Et aliqua ut ex esse incididunt ea non proident excepteur laboris. Do non non culpa consequat officia mollit magna ad et commodo do. Culpa elit laborum ex esse non est nostrud elit aliquip. Ut proident ad consectetur velit dolor ad pariatur anim dolor veniam officia.",
    },
    {
      title: "Aute ea exercitation anim irure labore exercitation ipsum ad exercitation commodo exercitation non magna.",
      link: "/",
      body:
        "Cupidatat occaecat quis ut magna in et amet sint est quis irure. Sint consequat eu velit nisi excepteur do incididunt elit fugiat mollit consequat. Non est pariatur Lorem nulla aliqua Lorem exercitation dolor laborum nisi occaecat laborum. Ipsum tempor deserunt ad cillum fugiat eiusmod amet do adipisicing esse magna incididunt tempor commodo. Dolore exercitation commodo excepteur veniam duis id.",
    },
  ];

  if (!notification?.length) return errorProp(400, "Unable to fetch notification");

  return {
    props: {
      notification,
    },
  };
};
