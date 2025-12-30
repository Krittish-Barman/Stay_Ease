function loadMyProperties() {
    const user = localStorage.getItem("loggedUser");
    document.getElementById("user-name").innerText = user;

    const properties = JSON.parse(localStorage.getItem("properties")) || [];

    const myProperties = properties.filter(p => p.owner === user);

    const container = document.getElementById("propertyList");

    if (myProperties.length === 0) {
        container.innerHTML = "<p class='empty'>You have not added any property yet.</p>";
        return;
    }

    myProperties.forEach(p => {
        const card = document.createElement("div");
        card.className = "property-card";

        card.innerHTML = `
            <h3>${p.title}</h3>
            <p><strong>Type:</strong> ${p.type}</p>
            <p><strong>Location:</strong> ${p.location}</p>
            <p><strong>Price:</strong> ₹${p.price}</p>
        `;

        container.appendChild(card);
    });
}
