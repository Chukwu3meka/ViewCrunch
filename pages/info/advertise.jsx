import Link from "next/link";
import InfoContainer from "@component/info";

const Advertise = () => (
  <InfoContainer
    title="Advertise with us"
    path="advertise"
    body={
      <>
        <span>
          In the era of fast-moving technology, nothing is permanent: The cliche goes: A picture is worth a thousand words. We're an open
          community that allows advertising.
        </span>
        <span>
          We maintain a moderate degree of Ads that does not interfere with our viewers and at the same time, displays your
          Products/Service to all viewers
        </span>
        <span>
          We have limited ads spaces, and have no inteention of increasing it, though. We don't want our site cluttered with Ads, since
          thats not the primary objective
        </span>
        <label>Ads Features</label>
        <ul>
          <li>One Company logo or Product image of your choice</li>
          <li>Link to company's webpage</li>
          <li>Discounted purchase rate</li>
          <li>Description of service</li>
        </ul>

        <Link href="/info/contactus">
          <a>Feel free to fill our contact form, to enable us get in touch and publish your advertisement</a>
        </Link>
      </>
    }
  />
);

export default Advertise;
