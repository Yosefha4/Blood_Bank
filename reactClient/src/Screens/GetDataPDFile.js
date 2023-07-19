import React from "react";
import PDFfile from "../components/PDFfile";
import { PDFDownloadLink } from "@react-pdf/renderer";

const GetDataPDFile = () => {
  const currentUserType = window.localStorage.getItem("userType");
  console.log(currentUserType);

  return (
    <div
      style={{
        alignItems: "center",
        textAlign: "center",
        marginTop: 36,
        justifyContent: "center",
      }}
    >
      {currentUserType === "Admin" ? (
        <div>
         
          <h3 style={{ marginBottom: 24 }}>PDF EXPORT<br />
          </h3>
          <h4 style={{ marginBottom: 12 }}>Get The History Action :</h4>{" "}
          <PDFDownloadLink document={<PDFfile />} fileName="Action History">
            {({ loading }) =>
              loading ? (
                <button
                  style={{
                    backgroundColor: "lightblue",
                    borderRadius: 6,
                    width: 120,
                    height: 40,
                    fontWeight: "bold",
                  }}
                >
                  Loading ...
                </button>
              ) : (
                <button
                  style={{
                    backgroundColor: "lightblue",
                    borderRadius: 6,
                    width: 120,
                    height: 40,
                    fontWeight: "bold",
                  }}
                >
                  Download PDF
                </button>
              )
            }
          </PDFDownloadLink>{" "}
        </div>
      ) : (
        <div style={{ fontWeight: "bold", fontSize: 24 }}>
          Requires Admin Permission ! <br /> Only an 'Admin' type user is
          authorized to access this information...
        </div>
      )}
      {/* <PDFfile /> */}
    </div>
  );
};

export default GetDataPDFile;
