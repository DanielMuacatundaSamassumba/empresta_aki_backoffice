export function getRefundInDays(refund_duration_type:any, refund_period:any) {
    switch (refund_duration_type) {
        case "1": return parseInt(refund_period, 10);           
        case "2": return parseInt(refund_period, 10) * 7;     
        case "3": return parseInt(refund_period, 10) * 30;   
        case "4": return parseInt(refund_period, 10) * 365; 
        default: return 0; 
    }
}