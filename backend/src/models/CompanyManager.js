const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  insert(company) {
    return this.database.query(
      `insert into ${this.table} (companyName, nSiret, contactPerson, email, phone) values ( ?, ?, ?, ?, ?)`,
      [
        company.companyName,
        company.nSiret,
        company.contactPerson,
        company.email,
        company.phone,
      ]
    );
  }

  update(company) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      {
        name: company.name,
        nSiret: company.nSiret,
        creationDate: company.creationDate,
        companyLogo: company.companyLogo,
      },
      company.id,
    ]);
  }
}

module.exports = CompanyManager;
