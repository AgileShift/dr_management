// Joins a journal entry of type 'Bank' with its corresponding bank account.
frappe.ui.form.on('Journal Entry Account', {
	account(frm, cdt, cdn) {
		let row = locals[cdt][cdn];

		// If there is Account and account_type is 'Bank', then reqd. Else, not reqd.
		// frm.set_df_property('accounts', 'reqd', (row.account && row.account_type === 'Bank'), frm.doc.name, 'bank_account', row.name);

		if (row.account_type !== 'Bank')
			return; // If is not a Bank Account, we don't need to fetch the bank account name

		frappe.db.get_value('Bank Account', {account: row.account}, 'name', (doc) => {
			row.bank_account = doc ? doc.name : '';
			refresh_field('bank_account', row.name, 'accounts');
		});
	},

	route(frm, cdt, cdn) {
		let row = locals[cdt][cdn];

		// frm.set_df_property('accounts', 'reqd', row.route, frm.doc.name, 'branch', row.name);

		if (row.route) {
			frappe.db.get_value('Territory', row.route, 'parent_territory', (doc) => {
				row.branch = doc ? doc.parent_territory : '';
				refresh_field('branch', row.name, 'accounts');
			});
		} else {
			row.branch = '';
			refresh_field('branch', row.name, 'accounts');
		}
	},

	branch(frm, cdt, cdn) {
		let row = locals[cdt][cdn];

		// frm.set_df_property('accounts', 'reqd', row.branch, frm.doc.name, 'branch', row.name);

		row.route = '';
		refresh_field('route', row.name, 'accounts');
	}
});
