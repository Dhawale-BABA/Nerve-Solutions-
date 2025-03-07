const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];

const strategyArray = [
    {
        'View': 'Bullish',
        'Value': {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Long Call'],
            '02-May-2024': ['Bull Call Spread', 'Long Call', 'Strategy1'],
            '09-May-2024': ['Strategy Put', 'Strategy Call'],
        }
    },
    {
        'View': 'Bearish',
        'Value': {
            '24-Apr-2024': ['Bear Call Spread', 'Long Put'],
            '31-May-2024': ['Long Put'],
            '21-Jun-2024': ['Bear Put Spread', 'Strategy3'],
        }
    },
    {
        'View': 'RangeBound',
        'Value': {
            '24-Apr-2024': ['Short Straddle', 'Iron Butterfly'],
            '02-May-2024': ['Short Straddle', 'Strategy1'],
            '21-Jun-2024': ['Iron Condor'],
        }
    },
    {
        'View': 'Volatile',
        'Value': {
            '02-May-2024': ['Long Straddle', 'Long Strangle'],
            '09-May-2024': ['Long Straddle', 'Strategy1'],
            '31-May-2024': ['Long Straddle'],
        }
    }
];

let selectedView = 'Bullish';
let selectedDate = dateArray[0];

document.addEventListener("DOMContentLoaded", () => {
    // Render date dropdown
    const dateDropdown = document.getElementById("dateDropdown");
    dateArray.forEach(date => {
        const option = document.createElement("option");
        option.value = date;
        option.textContent = date;
        dateDropdown.appendChild(option);
    });

    dateDropdown.value = selectedDate;
    updateStrategies();

    // Toggle view buttons
    document.querySelectorAll(".toggle-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            selectedView = this.getAttribute("data-view");
            updateStrategies();
        });
    });

    // Change strategies on date selection
    dateDropdown.addEventListener("change", function () {
        selectedDate = this.value;
        updateStrategies();
    });
});

function updateStrategies() {
    const strategyContainer = document.getElementById("strategyContainer");
    strategyContainer.innerHTML = "";

    const viewData = strategyArray.find(v => v.View === selectedView);
    const strategies = viewData?.Value[selectedDate] || [];

    if (strategies.length === 0) {
        strategyContainer.innerHTML = `<div class="empty-state">No strategies available for ${selectedDate}</div>`;
        return;
    }

    const strategyCount = {};
    strategies.forEach(strategy => {
        strategyCount[strategy] = (strategyCount[strategy] || 0) + 1;
    });

    Object.keys(strategyCount).forEach(strategy => {
        const card = document.createElement("div");
        card.classList.add("strategy-card");
        card.innerHTML = `<strong>${strategy}</strong> - ${strategyCount[strategy]} ${strategyCount[strategy] > 1 ? 'Strategies' : 'Strategy'}`;
        strategyContainer.appendChild(card);
    });

}
