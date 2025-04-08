const bcrypt = require('bcryptjs');
const User = require("./models/Users");

async function createSupportStaff() {
  try {
    const existingAdmin = await User.findOne({ where: { role: 'support_staff' } });
    if (existingAdmin) {
      console.log('Support Staff already exists.');
      return;
    }

    // Generate hashed password
    const plainPassword = 'ss123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    console.log('Hashed Password:', hashedPassword); // Check if it's hashed properly

    // Create admin user
    await User.create({
      first_name: "Support Staff",
      last_name: "User",
      email: "supportstaff@ust.edu.ph",
      username: "supportstaff",
      password_hash: hashedPassword,
      role: "support_staff",
      status: "active",
    });

    console.log('✅ Support staff user created successfully.');
  } catch (error) {
    console.error('❌ Error creating support staff:', error);
  }
}

createSupportStaff();
