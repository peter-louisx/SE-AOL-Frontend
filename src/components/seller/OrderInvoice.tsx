import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Order } from '../../types';
import { format } from 'date-fns';
import { Printer } from 'lucide-react';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12
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
  orderSummary: {
    marginBottom: 40,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  columnItem: {
    flex: 3,
  },
  columnQuantity: {
    flex: 1,
    textAlign: 'center',
  },
  columnPrice: {
    flex: 2,
    textAlign: 'right',
  },
  columnAmount: {
    flex: 2,
    textAlign: 'right',
  },
  totals: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  totalLabel: {
    width: 100,
    textAlign: 'right',
    marginRight: 20,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#666',
  },
  thankYou: {
    marginBottom: 8,
    fontSize: 14,
    color: '#666',
  },
  copyright: {
    fontSize: 10,
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

        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnItem}>ITEM</Text>
              <Text style={styles.columnQuantity}>QUANTITY</Text>
              <Text style={styles.columnPrice}>UNIT PRICE</Text>
              <Text style={styles.columnAmount}>AMOUNT</Text>
            </View>
            {order.products.map((product, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.columnItem}>{product.name}</Text>
                <Text style={styles.columnQuantity}>{product.quantity}</Text>
                <Text style={styles.columnPrice}>
                  Rp{product.price.toLocaleString('id-ID')}
                </Text>
                <Text style={styles.columnAmount}>
                  Rp{(product.price * product.quantity).toLocaleString('id-ID')}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>
                Rp{order.totalAmount.toLocaleString('id-ID')}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Shipping:</Text>
              <Text style={styles.totalValue}>Rp0</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { fontWeight: 'bold' }]}>Total:</Text>
              <Text style={[styles.totalValue, { fontWeight: 'bold' }]}>
                Rp{order.totalAmount.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.thankYou}>Thank you for supporting sustainable products!</Text>
          <Text style={styles.copyright}>© 2025 Trashure. All Rights Reserved.</Text>
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
        loading ? ('Generating invoice...') : (
          <span className="flex items-center gap-2">
            <Printer size={20} className="text-gray-700" />
            Download Invoice
          </span>
        )
      }
    </PDFDownloadLink>
  );
};

export default OrderInvoice;