import { useSelector } from "react-redux"
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font,
  } from "@React-pdf/renderer";

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#FFF",
      padding: 30,
    },
    header: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 30,
    },
    sender: {
      marginBottom: 20,
    },
    recipient: {
      marginBottom: 30,
    },
    addressLine: {
      fontSize: 12,
      marginBottom: 2,
    },
    itemsTable: {
      display: "flex", 
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: "#F0F0F0",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      fontSize: 12,
      textAlign: "center",
      padding: 5,
    },
    total: {
      marginTop: 20,
      textAlign: "right",
    },
    totalLabel: {
      fontSize: 14,
      fontWeight: "bold",
    },
    totalValue: {
      fontSize: 14,
    },
  });
const InvoiceTemplate = () => {
    const invoiceDetails = useSelector((state:any)=> state.reducer.invoice)
    console.log(invoiceDetails)
  return (
    <div>
      
    </div>
  )
}

export default InvoiceTemplate
