const getDataFromJson = (setStatecallback) => {
    fetch('/seats.json')
    .then(response => response.json())
    .then(data => {
        const seats = [];
        data.forEach((row, y) => {
            row.forEach((seat, x) => {
                if (seat !== null) {
                    seat.x = x;           // Add x coordinate based on column index
                    seat.y = y;           // Add y coordinate based on row index
                    seat.isSelected = false; // Add isSelected property
                    seats.push(seat);     // Collect the modified seat
                }
            });
        });
        setStatecallback(seats); // Set state with the flat array
    })
    .catch(error => console.error('Error fetching seat data:', error));
}

export default getDataFromJson