const classCodes = {
    fighter: 1,
    barbarian: 2,
    rogue: 4,
    ranger: 8,
    wizard: 16,
    cleric: 32,
    bard: 64,
    warlock: 128,
    druid: 256,
    sorcerer: 512,
  };
var klass = "";
const classPortraits = {
  barbarian: "/dnd-builds/images/barbarian.webp",
  cleric: "/dnd-builds/images/cleric.png",
  ranger: "/dnd-builds/images/ranger.png",
  bard: "/dnd-builds/images/bard.webp",
  wizard: "/dnd-builds/images/wizard.webp",
  warlock: "/dnd-builds/images/warlock.webp",
  sorcerer: "/dnd-builds/images/sorcerer.webp",
  rogue: "/dnd-builds/images/rogue.webp",
  druid: "/dnd-builds/images/druid.webp",
  fighter: "/dnd-builds/images/fighter.webp",
};

function resetGearSlots() {
    const equippedIcons = document.querySelectorAll("img.item-icon");
    equippedIcons.forEach(icon => icon.remove());
  }
  
  function updateClassPortrait() {
    const portrait = classPortraits[klass];
    const imgElement = document.getElementById("class-portrait");
    if (portrait) {
      imgElement.src = portrait;
      imgElement.style.display = "block";
    } else {
      imgElement.style.display = "none"; 
    }
  }
  
  function updateAllStats() {
    updateMaxHealth();
    updateActionSpeed();
    updatePhysicalDamageReduction();
    updateMagicalDamageReduction();
    updatePhysicalPowerAndBonus();
    updateMagicalPowerAndBonus();
    updateRegularInteractionSpeed();
    updateMoveSpeed();
  }
  
  function FighterStart(){ 
    resetGearSlots();
    klass = "fighter"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 15;
    document.getElementById("vigor").innerHTML = 15;
    document.getElementById("agility").innerHTML = 15;
    document.getElementById("dexterity").innerHTML = 15;
    document.getElementById("will").innerHTML = 15;
    document.getElementById("knowledge").innerHTML = 15;
    document.getElementById("resourcefulness").innerHTML = 15;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 30;
    updateAllStats();
  }
  
  function RangerStart() {
    resetGearSlots();
    klass = "ranger"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 12;
    document.getElementById("vigor").innerHTML = 10;
    document.getElementById("agility").innerHTML = 20;
    document.getElementById("dexterity").innerHTML = 18;
    document.getElementById("will").innerHTML = 10;
    document.getElementById("knowledge").innerHTML = 12;
    document.getElementById("resourcefulness").innerHTML = 23;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 15;
    updateAllStats();
  }
  
  function ClericStart() {
    resetGearSlots();
    klass = "cleric"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 11;
    document.getElementById("vigor").innerHTML = 13;
    document.getElementById("agility").innerHTML = 12;
    document.getElementById("dexterity").innerHTML = 14;
    document.getElementById("will").innerHTML = 23;
    document.getElementById("knowledge").innerHTML = 20;
    document.getElementById("resourcefulness").innerHTML = 12;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 62;
    updateAllStats();
  }
  
  function DruidStart() {
    resetGearSlots();
    klass = "druid"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 12;
    document.getElementById("vigor").innerHTML = 13;
    document.getElementById("agility").innerHTML = 12;
    document.getElementById("dexterity").innerHTML = 12;
    document.getElementById("will").innerHTML = 18;
    document.getElementById("knowledge").innerHTML = 20;
    document.getElementById("resourcefulness").innerHTML = 18;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 42;
    updateAllStats();
  }
  
  function BardStart() {
    resetGearSlots();
    klass = "bard"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 13;
    document.getElementById("vigor").innerHTML = 13;
    document.getElementById("agility").innerHTML = 13;
    document.getElementById("dexterity").innerHTML = 20;
    document.getElementById("will").innerHTML = 11;
    document.getElementById("knowledge").innerHTML = 20;
    document.getElementById("resourcefulness").innerHTML = 15;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 18;
    updateAllStats();
  }
  
  function WarlockStart() {
    resetGearSlots();
    klass = "warlock"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 11;
    document.getElementById("vigor").innerHTML = 14;
    document.getElementById("agility").innerHTML = 14;
    document.getElementById("dexterity").innerHTML = 15;
    document.getElementById("will").innerHTML = 22;
    document.getElementById("knowledge").innerHTML = 15;
    document.getElementById("resourcefulness").innerHTML = 14;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 58;
    updateAllStats();
  }
  
  function SorcererStart() {
    resetGearSlots();
    klass = "sorcerer"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 10;
    document.getElementById("vigor").innerHTML = 10;
    document.getElementById("agility").innerHTML = 10;
    document.getElementById("dexterity").innerHTML = 18;
    document.getElementById("will").innerHTML = 25;
    document.getElementById("knowledge").innerHTML = 20;
    document.getElementById("resourcefulness").innerHTML = 12;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 70;
    updateAllStats();
  }
  
  function WizardStart() {
    resetGearSlots();
    klass = "wizard"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 6;
    document.getElementById("vigor").innerHTML = 7;
    document.getElementById("agility").innerHTML = 15;
    document.getElementById("dexterity").innerHTML = 17;
    document.getElementById("will").innerHTML = 20;
    document.getElementById("knowledge").innerHTML = 25;
    document.getElementById("resourcefulness").innerHTML = 15;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 50;
    updateAllStats();
  }
  
  function RogueStart() {
    resetGearSlots();
    klass = "rogue"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 9;
    document.getElementById("vigor").innerHTML = 10;
    document.getElementById("agility").innerHTML = 21;
    document.getElementById("dexterity").innerHTML = 25;
    document.getElementById("will").innerHTML = 10;
    document.getElementById("knowledge").innerHTML = 10;
    document.getElementById("resourcefulness").innerHTML = 20;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 15;
    updateAllStats();
  }
  
  function BarbarianStart() {
    resetGearSlots();
    klass = "barbarian"; 
    updateClassPortrait();
    document.getElementById("strength").innerHTML = 25;
    document.getElementById("vigor").innerHTML = 25;
    document.getElementById("agility").innerHTML = 13;
    document.getElementById("dexterity").innerHTML = 12;
    document.getElementById("will").innerHTML = 18;
    document.getElementById("knowledge").innerHTML = 5;
    document.getElementById("resourcefulness").innerHTML = 7;
    document.getElementById("armor_rating").innerHTML = 0;
    document.getElementById("magic_resistance").innerHTML = 42;
    updateAllStats();
  }

function updateMaxHealth() {
    let strengthValue = parseFloat(document.getElementById("strength").innerHTML);
    let vigorValue = parseFloat(document.getElementById("vigor").innerHTML);
    let baseHealthRating = strengthValue * 0.25 + vigorValue * 0.75;

    function calculateBaseHealth(rating) {
        if (rating <= 0) {
            return 80;
        } else if (rating <= 34) {
            return 80 + rating * 2;
        } else if (rating <= 50) {
            return 148 + (rating - 34) * 1.5;
        } else if (rating <= 75) {
            return 172 + (rating - 50) * 1;
        } else if (rating <= 100) {
            return 197 + (rating - 75) * 0.5;
        } else {
            return 209.5;
        }
    }

    let baseHealth = calculateBaseHealth(baseHealthRating);
    document.getElementById("max_health").innerHTML = baseHealth.toFixed(2);
}




function updateActionSpeed() {
    let agilityValue = parseFloat(document.getElementById("agility").innerHTML);
    let dexterityValue = parseFloat(document.getElementById("dexterity").innerHTML);
    let actionSpeedRating = agilityValue * 0.25 + dexterityValue * 0.75;

    function calculateActionSpeed(rating) {
        if (rating <= 0) {
            return -38;
        } else if (rating <= 10) {
            return -38 + rating * 3;
        } else if (rating <= 13) {
            return -8 + (rating - 10) * 2;
        } else if (rating <= 25) {
            return -2 + (rating - 13) * 1;
        } else if (rating <= 41) {
            return 10 + (rating - 25) * 1.5;
        } else if (rating <= 50) {
            return 34 + (rating - 41) * 1;
        } else if (rating <= 100) {
            return 43 + (rating - 50) * 0.5;
        } else {
            return 68;
        }
    }

    let actionSpeed = calculateActionSpeed(actionSpeedRating);
    document.getElementById("action_speed").innerHTML = actionSpeed.toFixed(2) + "%";
}



function updatePhysicalDamageReduction() {
    let armorRating = parseFloat(document.getElementById("armor_rating").innerHTML);
    if (!armorRating && armorRating !== 0) return;
    function calculatePhysicalDamageReduction(rating) {
        if (rating <= -300) {
            return -619;
        } else if (rating <= -3) {
            return -619 + (rating + 300) * 2;
        } else if (rating <= 20) {
            return -25 + (rating + 3) * 1;
        } else if (rating <= 30) {
            return -2 + (rating - 20) * 0.5;
        } else if (rating <= 45) {
            return 3 + (rating - 30) * 0.4;
        } else if (rating <= 65) {
            return 9 + (rating - 45) * 0.3;
        } else if (rating <= 85) {
            return 15 + (rating - 65) * 0.25;
        } else if (rating <= 200) {
            return 20 + (rating - 85) * 0.2;
        } else if (rating <= 300) {
            return 43 + (rating - 200) * 0.15;
        } else if (rating <= 374) {
            return 58 + (rating - 300) * 0.1;
        } else if (rating <= 500) {
            return 65.4 + (rating - 374) * 0.05;
        } else {
            return 71.7;
        }
    }

    let physicalDamageReduction = calculatePhysicalDamageReduction(armorRating);
    document.getElementById("physical_damage_reduction").innerHTML = physicalDamageReduction.toFixed(2) + "%";
}



function updateMagicalDamageReduction() {
    let magicResistance = parseFloat(document.getElementById("magic_resistance").innerHTML);

    function calculateMagicalDamageReduction(rating) {
        if (rating <= -300) {
            return -595;
        } else if (rating <= -15) {
            return -595 + (rating + 300) * 2;
        } else if (rating <= 8) {
            return -25 + (rating + 15) * 1;
        } else if (rating <= 18) {
            return -2 + (rating - 8) * 0.5;
        } else if (rating <= 33) {
            return 3 + (rating - 18) * 0.4;
        } else if (rating <= 53) {
            return 9 + (rating - 33) * 0.3;
        } else if (rating <= 85) {
            return 15 + (rating - 53) * 0.25;
        } else if (rating <= 280) {
            return 23 + (rating - 85) * 0.2;
        } else if (rating <= 340) {
            return 62 + (rating - 280) * 0.15;
        } else if (rating <= 430) {
            return 71 + (rating - 340) * 0.1;
        } else if (rating <= 500) {
            return 80 + (rating - 430) * 0.05;
        } else {
            return 83.5;
        }
    }

    let magicalDamageReduction = calculateMagicalDamageReduction(magicResistance);
    document.getElementById("magical_damage_reduction").innerHTML = magicalDamageReduction.toFixed(2) + "%";
}


function updatePhysicalPowerAndBonus() {
    let strength = parseFloat(document.getElementById("strength").innerHTML);

    function calculatePhysicalPower(strength) {
        return strength > 0 ? strength : 0;
    }

    function calculatePhysicalPowerBonus(physicalPower) {
        if (physicalPower <= 0) {
            return -80;
        } else if (physicalPower <= 5) {
            return -80 + physicalPower * 10;
        } else if (physicalPower <= 7) {
            return -30 + (physicalPower - 5) * 5;
        } else if (physicalPower <= 11) {
            return -20 + (physicalPower - 7) * 3;
        } else if (physicalPower <= 15) {
            return -8 + (physicalPower - 11) * 2;
        } else if (physicalPower <= 50) {
            return 0 + (physicalPower - 15) * 1;
        } else if (physicalPower <= 100) {
            return 35 + (physicalPower - 50) * 0.5;
        } else {
            return 60;
        }
    }

    let physicalPower = calculatePhysicalPower(strength);
    let physicalPowerBonus = calculatePhysicalPowerBonus(physicalPower);

    document.getElementById("physical_power").innerHTML = physicalPower;
    document.getElementById("physical_power_bonus").innerHTML = physicalPowerBonus.toFixed(2) + "%";
}




function updateMagicalPowerAndBonus() {
    let willValue = parseFloat(document.getElementById("will").innerHTML);
    let magicalPower = willValue; 

    function calculateMagicalPowerBonus(magicalPower) {
        if (magicalPower <= 0) {
            return -90;
        } else if (magicalPower <= 1) {
            return -90 + magicalPower * 0;
        } else if (magicalPower <= 5) {
            return -90 + (magicalPower - 1) * 10;
        } else if (magicalPower <= 15) {
            return -50 + (magicalPower - 5) * 5;
        } else if (magicalPower <= 21) {
            return 0 + (magicalPower - 15) * 2.5;
        } else if (magicalPower <= 40) {
            return 15 + (magicalPower - 21) * 2;
        } else if (magicalPower <= 50) {
            return 53 + (magicalPower - 40) * 1;
        } else if (magicalPower <= 100) {
            return 63 + (magicalPower - 50) * 0.5;
        } else {
            return 88;
        }
    }

    let magicalPowerBonus = calculateMagicalPowerBonus(magicalPower);

    document.getElementById("magical_power").innerHTML = magicalPower;
    document.getElementById("magical_power_bonus").innerHTML = magicalPowerBonus.toFixed(2) + "%";
}




function updateMoveSpeed() {
    let agilityValue = parseFloat(document.getElementById("agility").innerHTML);
    let baseMoveSpeed =300;

    function calculateMoveSpeedBonus(agility) {
        if (agility <= 0) {
            return -10;
        } else if (agility <= 10) {
            return -10 + agility * 0.5;
        } else if (agility <= 15) {
            return -5 + (agility - 10) * 1;
        } else if (agility <= 75) {
            return 0 + (agility - 15) * 0.75;
        } else if (agility <= 100) {
            return 45 + (agility - 75) * 0.5;
        } else {
            return 57.5; 
        }
    }

    let moveSpeedBonus = calculateMoveSpeedBonus(agilityValue);
    let totalMoveSpeed = baseMoveSpeed + moveSpeedBonus;

    document.getElementById("movement_speed").innerHTML = totalMoveSpeed.toFixed(2);
    document.getElementById("move_speed_bonus").innerHTML = moveSpeedBonus.toFixed(2);
}

function updateRegularInteractionSpeed() {
    let agilityValue = parseFloat(document.getElementById("agility").innerHTML);
    let resourcefulnessValue = parseFloat(document.getElementById("resourcefulness").innerHTML);
    
    let regularInteractionSpeedRating = agilityValue * 0.4 + resourcefulnessValue * 0.6;

    function calculateRegularInteractionSpeed(rating) {
        if (rating <= 0) {
            return -26;  
        } else if (rating <= 7) {
            return -26 + rating * 2;  
        } else if (rating <= 15) {
            return -12 + (rating - 7) * 1.5;  
        } else if (rating <= 20) {
            return 0 + (rating - 15) * 7;  
        } else if (rating <= 25) {
            return 35 + (rating - 20) * 6;  
        } else if (rating <= 30) {
            return 65 + (rating - 25) * 5;  
        } else if (rating <= 35) {
            return 90 + (rating - 30) * 4;  
        } else if (rating <= 40) {
            return 110 + (rating - 35) * 3;  
        } else if (rating <= 45) {
            return 125 + (rating - 40) * 2;  
        } else if (rating <= 100) {
            return 135 + (rating - 45) * 1;  
        } else {
            return 190; 
        }
    }

    let regularInteractionSpeed = calculateRegularInteractionSpeed(regularInteractionSpeedRating);
    document.getElementById("regular_interaction_speed").innerHTML = regularInteractionSpeed.toFixed(2) + "%";
}