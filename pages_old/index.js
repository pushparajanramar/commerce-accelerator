import contentstack from "contentstack";
//import {initializeLivePreview} from "../contentstack-sdk"
// import "@contentstack/live-preview-utils/dist/main.css";
import { Stack } from "./api/utils";
import { StackCG } from "./api/utils_cg";
import Components from "../components/ComponentIndex";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectToken,
  selectAuthUser,
  setAuthState,
  setAuthUser,
  setToken,
  selectAuthState,
} from "../store/slices/authSlice";
import SectionHeading from "../components/Sitewide/SectionHeading";


export default function HomePage({ pageData, user, cgData }) {
  const [cartIndicator, setCartIndicator] = useState(0);
  const [cartData, setCartData] = useState(null);

  const { data: session, status: status } = useSession();
  const dispatch = useDispatch();
  const userData = useSelector(selectAuthUser);
  const userAuthState = useSelector(selectAuthState);
  const userToken = useSelector(selectToken);

  //Retrieve CDC auth state from next-auth and pass to Redux store
  useEffect(() => {
    session
      ? dispatch(setToken(session?.session?.access_token?.access_token))
      : null;
    session ? dispatch(setAuthUser(session?.session?.user)) : null;
    status === "authenticated"
      ? dispatch(setAuthState(true))
      : dispatch(setAuthState(false));
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart && storedCart !== "undefined") {
      setCartData(storedCart?.entry);
      setCartIndicator(storedCart?.entry?.quantity);
    }
  }, []);

  // useEffect(() => {
  //   initializeLivePreview();
  //   console.log('initialize preview effect');
  //   // ContentstackLivePreview.init({enable: true,ssr: true, debug: true, stackDetails: {
  //   //   apiKey: process.env.CONTENTSTACK_API_KEY
  //   // }});
  // },[]);

  const componentElementList = pageData.map((callawaycomponent, i) => {
    //Components from ContentStack will either provide the plain data, or an object with a uid reference to
    //another object, and so we pass the corresponding data/id and comopnent type to the child component and it's their responsibility
    //to render the content, or to do a subsequent fetch for the rest of the data.
    //TODO: remove props as they're now in redux
    const ComponentToRender = Components[callawaycomponent._content_type_uid]
      ? Components[callawaycomponent._content_type_uid]
      : Components["NullView"];
    return (
      <ComponentToRender
        pageData={callawaycomponent}
        token={userToken}
        user={user}
        key={i}
      />
    );
  });

  return (
    <>
      <div className="container md:mx-12">{[componentElementList]}</div>

      <div className="">
        {cgData?.length > 0 &&
          cgData.map((el, i) => (
            <div key={i}>
              {el?.section_heading && (
                <>
                  <SectionHeading
                    heading={el?.section_heading.heading}
                    content={el?.section_heading.content}
                    alignment={el?.section_heading.position}
                  />
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

const fetchData = (contentType, entryId, stackInstance) => {
  try {
    if (entryId) {
      let Query = stackInstance.ContentType(contentType).Entry(entryId);
      return Query.fetch().then(
        function success(entry) {
          //console.info("stack", Stack);
          return entry;
        },
        function error(err) {
          console.log("Error", err);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const getServerSideProps = async (context) => {
  const res = await fetchData(
    "nextjs_homepage",
    "blt4c02466dc579cc44",
    Stack
  ).then(
    function success(entry) {
      const objArr = [];
      entry?.toJSON()?.page_content.map((component) => {
        //Recursive function to iterate through Modular Block data in ContentStack. The object contains several uid and _content_type_uid values that identify the components
        //present in the block, and we generate an array with these, which will in turn be used to map to our component list to populate the page.
        const iterate = (component) => {
          const obj = {};
          Object.keys(component).forEach((key) => {
            if (key === "uid" || key == "_content_type_uid") {
              obj[key] = component[key];
            }

            if (Object.keys(obj).length >= 2) {
              objArr.push(obj);
            }

            if (typeof component[key] === "object" && component[key] !== null) {
              iterate(component[key]);
            }
          });
        };
        iterate(component);
      });
      return objArr;
    },
    function error(err) {
      throw new Error(
        `Failed to fetch pageData, received status ${err.status}`
      );
    }
  );

  const pageData = await res;

  const response = await fetchData("page", "blt842cd305a997595f", StackCG).then(
    function success(entry) {
      return entry?.toJSON()?.modular_blocks;
    },
    function error(err) {
      throw new Error(
        `Failed to fetch pageData, received status ${err.status}`
      );
    }
  );
  //const pageData = []; //TODO: remove this and uncomment code above when we have contentstack working

  // If the request was successful, return the pageData
  // and revalidate every second.
  return {
    props: {
      pageData,
      cgData: response,
    },
  };
};
