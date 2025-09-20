async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const invoiceElement = document.getElementById('invoice');
    
    // Use html method with auto-paging
    await doc.html(invoiceElement, {
        callback: function (doc) {
            doc.save('invoice.pdf');
        },
        x: 10,
        y: 10,
        width: 190, // A4 width in mm
        windowWidth: 800, // Match your invoice width
        html2canvas: { scale: 0.264 }, // mm to px conversion for accuracy
        autoPaging: 'text' // Auto-split text content across pages
    });
}

function generateJPEG() {
    const invoiceElement = document.getElementById('invoice');
    
    html2canvas(invoiceElement, {
        scale: 2, // Higher quality
        height: invoiceElement.scrollHeight, // Capture full height to prevent breaks
        windowHeight: invoiceElement.scrollHeight,
        scrollY: -window.scrollY // Handle any scrolling
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'invoice.jpg';
        link.click();
    });
}
