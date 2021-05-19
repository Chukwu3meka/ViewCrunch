const title = "What is the common use of custom server in nextjs among Junior developers or newbies",
  description = "I was faced with some problems or rather questions concerning Next.js; among which was the use of custom server in Next.js. At that time my only help was the Next.js doc as I didn't find much articles online that",
  keywords = "custom server, Next.js, developer, nodejs",
  content = <>
  <p>
    I started using Next.js in may 2020, and i fell deeply in love with it for many reasons I'll publish a view for, but during my date with
    my newly found love "Next.js". I was faced with some problems or rather questions concerning Next.js; among which was the use of custom server in Next.js. at the time my only help was the Next.js doc as i didn't find much articles online that has to do with Next.js, and to add salt to injury all tutorials i was watching at that time used custom server commonly (Express.js) and Next.js versions less than 9.0, to confuse me more i followed this tradition of custom server but whenever i run my code "next start" or "next dev". I get this weird warning:
  </p>
  image***
  
  <p>
    I did more research only to discover that the common reason why developers use custom server was for dynamic routing. You might be
    asking why I don't want a custom server and my reason for seeing this as a problem and then I'll reply.
  </p>
  
  <ol>
    <li>
      I built a Web Application @ soccermass.com using react and at that time I already developed an API for SoccerMASS web, which i also
      plan to use when i develop the Mobile Application. After learning Next.js, I converted this react application to a Next.js app; So i
      found this cumbersome to start afresh working on a new server.
    </li>
    <li>
      I just didn't want to have express and other server side libraries installed in my Next.js environment, as I need to enjoy all important
      performance optimization that comes with Next.js
    </li>
    <li>
      <p>It was too much of a stress managing separate servers(One for mobile and the other for web), that does the same thing.</p>
      <p>
        At the end i discovered that all i needed to do was make the same API calls i used in react, and Next.js added fun to it by making
        it much more easier to get data using the getServerSideProps or getStaticProps
      </p>
      <pre>
      //getServerSideProps
    
      export const fetcher = (url, data) => {
        return fetch(url, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: data,
        credentials: "same-origin",
        }).then((res) => res.json());
      };
      
      const Profile = ({data}) => `getServerSideProps example JSON.stringify(data)`
      
      export default Profile;
    
      export const getServerSideProps = async ({
        const data = await fetcher("/api/getNames", JSON.stringify({format: "only names"})
        
        return {
          props: { data }
        };
      };
    
  </pre>

  </li>
  </ol>
  <h2>Though custom server might give you the option to</h2>
  
  <ul>
    <li>Disable file-system routing</li>
    <li>Single hosting</li>
    <li>Single Domain</li>
    <li>Easy authentication</li>
    <li>Control over Next.js default behavior</li>
    <li>Routing configuration</li>
  </ul>
  
  <p>
    If you research further, you'll see newer versions of Next.js already have all the benefits for custom server. So I conclude by saying
    that if you are using custom server in Next.js just for dynamic routing, Next.js 9.4 has redeemed by adding getStaticProps and this
    version also comes with CSS and sass support out of the box with no extra configuration, with SASS.
  </p>
  
  <pre>
  
    //you just install the SASS package **run** 
    
    npm i sass
    
  
    //'i' short for install
    //'sass' SASS package to be installed 
  </pre>
  </>;

