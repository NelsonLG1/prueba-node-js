export function querySalesDay(day:Date) {
 return {
    "$expr": {
      "$and": [
        { $eq: [{ $year: "$sale_at" }, { $year: new Date(day) }]},
        { $eq: [{ $month: "$sale_at" }, { $month: new Date(day) }]},
        { $eq: [{ $dayOfMonth: "$sale_at" }, { $dayOfMonth: new Date(day) }]}
      ]
    }
  }
}

export function querySalesMonth(month:Date) {
  return {
     "$expr": {
       "$and": [
         { $eq: [{ $year: "$sale_at" }, { $year: new Date(month) }]},
         { $eq: [{ $month: "$sale_at" }, { $month: new Date(month) }]},
       ]
     }
   }
 }