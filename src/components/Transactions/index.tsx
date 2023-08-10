import { useCallback } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"
import { useApprovalStatus } from "src/context /approval"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { approvalStatuses, setApprovalStatuses } = useApprovalStatus()
  const { loading } = useCustomFetch()

  // const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
  //   async ({ transactionId, newValue }) => {
  //     await fetchWithoutCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
  //       transactionId,
  //       value: newValue,
  //     })
  //   },
  //   [fetchWithoutCache]
  // )
  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      setApprovalStatuses({
        ...approvalStatuses,
        [transactionId]: newValue,
      })
    },
    [approvalStatuses, setApprovalStatuses]
  )

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setTransactionApproval}
          approved={
            approvalStatuses[transaction.id] !== undefined
              ? approvalStatuses[transaction.id]
              : transaction.approved
          }
        />
      ))}
    </div>
  )
}
