export interface Target{
    user_id: number
    category: string
    target_amount: number
    period: string
    created_at: string
    updated_at: string
}

export interface TargetsOverviewProps {
    targets: Target[]
    onAddNewTarget: () => void
}
