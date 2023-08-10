import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"

// export const TransactionPane: TransactionPaneComponent = ({
//   transaction,
//   loading,
//   setTransactionApproval: consumerSetTransactionApproval,
// }) => {
//   const [approved, setApproved] = useState(transaction.approved)
//   useEffect(() => {
//     setApproved(transaction.approved)
//   }, [transaction.approved])

//   const handleApprovalChange = (newValue: boolean) => {
//     setApproved(newValue)
//     consumerSetTransactionApproval({ transactionId: transaction.id, newValue })
//   }
export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
  approved,
}) => {
  // const [approved, setApproved] = useState(transaction.approved)
  // useEffect(() => {
  //   setApproved(transaction.approved)
  // }, [transaction.approved])

  const handleApprovalChange = (newValue: boolean) => {
    // setApproved(newValue) // Remove this line
    consumerSetTransactionApproval({ transactionId: transaction.id, newValue })
  }
  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        // onChange={(newValue) => {
        //   setApproved(newValue)
        // }}
        onChange={handleApprovalChange}
      />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
