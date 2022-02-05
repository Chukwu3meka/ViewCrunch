import InfoContainer from "@component/info";

const About = () => (
  <InfoContainer
    title="About"
    path="about"
    body={
      <>
        <span>
          Everyone has a view on different subjects and ideas, that's why we created ViewCrunch for you to share your views with the
          world. ViewCrunch is free and will always remain free, We'll never charge you for using our platform
        </span>
        <span>
          Meet like minded people on medium and connect with them, will at the same time, you make your profile standout. ViewCrunch is
          home to curious minds, we'll keep you upto date with recent happenings around the globe and provide you with contents from
          crunches your'e subscribed to.
        </span>
        <span>
          On ViewCrunch, we don't disturb our subcribers with frequent mails, we only send mails when it's important. ViewCrunch model
          has been Empathy and we always put you first before ourselves
        </span>
      </>
    }
  />
);

export default About;
