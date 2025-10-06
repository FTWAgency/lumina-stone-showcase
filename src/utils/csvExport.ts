export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(","), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle nested objects, arrays, and special characters
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value).replace(/,/g, ";");
        if (typeof value === "string" && value.includes(",")) return `"${value}"`;
        return value;
      }).join(",")
    )
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const flattenForExport = (data: any[], nestedFields: string[] = []) => {
  return data.map(item => {
    const flattened: any = { ...item };
    
    nestedFields.forEach(field => {
      if (flattened[field] && typeof flattened[field] === "object") {
        const nested = flattened[field];
        delete flattened[field];
        
        Object.keys(nested).forEach(key => {
          flattened[`${field}_${key}`] = nested[key];
        });
      }
    });
    
    return flattened;
  });
};
