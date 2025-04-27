import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Order } from '../../types';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  orderInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    marginBottom: 8,
  },
  table: {
    width: 'auto',
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableCell: {
    padding: 5,
  },
  total: {
    marginTop: 20,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

interface OrderInvoiceProps {
  order: Order;
}

const OrderInvoice: React.FC<OrderInvoiceProps> = ({ order }) => {
  const InvoiceDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text>{order.id}</Text>
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.label}>Customer</Text>
          <Text style={styles.value}>{order.customerName}</Text>

          <Text style={styles.label}>Shipping Address</Text>
          <Text style={styles.value}>
            {`${order.shippingAddress.street}\n${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}\n${order.shippingAddress.country}`}
          </Text>

          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.value}>
            {format(new Date(order.createdAt), 'PPP')}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={{ flex: 2 }}>Product</Text>
            <Text style={{ flex: 1 }}>Quantity</Text>
            <Text style={{ flex: 1 }}>Price</Text>
            <Text style={{ flex: 1 }}>Total</Text>
          </View>

          {order.products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{product.name}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{product.quantity}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(product.price)}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(product.price * product.quantity)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text>
            Total:{' '}
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(order.totalAmount)}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      document={<InvoiceDocument />}
      fileName={`invoice-${order.id}.pdf`}
      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
    >
      {({ loading }) =>
        loading ? 'Generating invoice...' : 'Download Invoice'
      }
    </PDFDownloadLink>
  );
};

export default OrderInvoice;