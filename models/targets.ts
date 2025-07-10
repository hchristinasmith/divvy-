export interface Targets{
    user_id: number
    category: string
    target_amount: number
    period: string
    created_at: string
    updated_at: string
}

export interface TargetsOverviewProps {
    targets: Targets[]
    onAddNewTarget: () => void
}
