"use client";
import ReactMarkdown from "react-markdown";
import { copyTextToClipboard } from "../data/save";
import Logo from "../assets/New Project-1dJMFr4r.png";
import Image from "next/image";
export interface Response {
  id?: Number;
  role?: "user" | "ai";
  message?: string;
}
type reqProps = {
  reqRes: Response[];
  statusaimessage: string;
};

const Messages = ({ reqRes, statusaimessage }: reqProps) => {
  return (
    <div className="p-16 flex flex-col overflow-y-auto w-full h-[80%]">
      {reqRes.length === 0 && !statusaimessage ? (
        <div className="flex flex-col items-center">
          <Image src={Logo} alt="" className="w-44" />
          <h1 className="bf text-center text-[#FAF6E9] lg:text-6xl sm:text-5xl max-sm:text-2xl py-10">
            What can I help you with today?{" "}
          </h1>
        </div>
      ) : (
        <>
          {reqRes.map((item, index) => (
            <div key={index} className="w-full">
              {item.role === "user" ? (
                <div
                  className={`flex justify-start items-center w-fit gap-2 ml-10 my-10 lTr`}
                >
                  {/* <FaUserCircle className="showHide text-3xl text-white" /> */}
                  <div
                    className="bg-white w-fit p-2.5 rounded-full cursor-copy"
                    onClick={() => copyTextToClipboard(item.message ?? "")}
                  >
                    <p className="text-left">{item.message}</p>
                  </div>
                </div>
              ) : (
                <div className=" flex justify-end">
                  <div
                    className="bg-[#2b2b2b] w-[70%] p-5 rounded-3xl cursor-copy"
                    onClick={() => copyTextToClipboard(item.message ?? "")}
                  >
                    <div className="text-left text-white markdown-response">
                      <ReactMarkdown
                        components={{
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-bold text-gray-100"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p
                              className="mb-3 leading-relaxed text-green-300"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-none pr-5 mb-4 text-green-300"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-none pr-5 mb-4" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-2" {...props} />
                          ),
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold mb-4 mt-6"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-xl font-bold mb-3 mt-5"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-lg font-bold mb-2 mt-4"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {item?.message
                          ?.replace("<think>", "")
                          ?.replace("</think>", "")}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {statusaimessage === "Generating response" && (
        <div className="flex justify-center items-center">
          <div
            className="text-white h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      {statusaimessage === "Failed to get response" && (
        <div className="mb-2 text-red-500 text-center">
          Failed to get response
        </div>
      )}
    </div>
  );
};

export default Messages;
