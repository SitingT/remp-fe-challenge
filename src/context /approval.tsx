import React, { createContext, useState, useContext } from "react"

type ApprovalStatusContextType = {
  approvalStatuses: { [key: string]: boolean }
  setApprovalStatuses: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
}

const ApprovalContext = createContext<ApprovalStatusContextType | undefined>(undefined)

type ApprovalProviderProps = {
  children: React.ReactNode
}

export const ApprovalProvider = ({ children }: ApprovalProviderProps) => {
  const [approvalStatuses, setApprovalStatuses] = useState<{ [key: string]: boolean }>({})
  return (
    <ApprovalContext.Provider value={{ approvalStatuses, setApprovalStatuses }}>
      {children}
    </ApprovalContext.Provider>
  )
}

export const useApprovalStatus = () => {
  const context = useContext(ApprovalContext)
  if (!context) {
    throw new Error("useApprovalStatus must be used within an ApprovalProvider")
  }
  return context
}
