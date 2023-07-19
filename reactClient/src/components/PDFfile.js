import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ImagePdf from "../assets/bbLogo.png";
import axios from "axios";




const PDFfile = () => {
  const [logInfoHistory, setLogInfoHistory] = useState([]);

  useEffect(() => {
    const getLogInfo = async () => {
      try {
        const res = await axios.get("https://blood-bank-2023.onrender.com/api/logInfo");

        setLogInfoHistory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLogInfo();
  }, []);

  // console.log(logInfoHistory);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={ImagePdf} />
          <Text style={styles.title}>The Blood Bank - Activity Report</Text>
        </View>

        {logInfoHistory.length > 0 ? (
          logInfoHistory.map((item, index) => (
            <View key={item._id} style={styles.activityContainer}>
              <Text
                style={[
                  styles.activityNumber,
                  item.info.includes("Updating") ? styles.blueText : item.info.includes("donate") ? styles.redText : styles.greenText,
                ]}
              >
                {index + 1}
              </Text>
              <Text style={styles.activityText}>{item.info}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noActivityText}>No activity history...</Text>
        )}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};

export default PDFfile;


const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  activityContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  activityNumber: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
  },
  activityText: {
    flex: 1,
    fontSize: 12,
  },
  noActivityText: {
    marginTop: 20,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "gray",
  },
  redText: {
    color: "red",
  },
  greenText: {
    color: "green",
  },
  blueText: {
    color: "blue",
  },
});
