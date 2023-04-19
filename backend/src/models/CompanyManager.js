const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  insert(company) {
    return this.database.query(
      `insert into ${this.table} (name, nSiret, creationDate, companyLogo) values (?, ?, ?, ?)`,
      [company.name, company.nSiret, company.creationDate, company.companyLogo]
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
