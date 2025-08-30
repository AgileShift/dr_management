from datetime import datetime

import frappe
from frappe.model.naming import make_autoname


def autoname(doc, method):
	months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]

	if not doc.posting_date:
		frappe.throw("El campo de 'Fecha' es requerido para generar el Consecutivo del Comprobante.")

	posting_date = datetime.strptime(doc.posting_date, "%Y-%m-%d")  # Convert to datetime object
	year = posting_date.strftime("%Y")
	month = months[posting_date.month - 1]

	prefix = f"CD-{year}-{month}-"
	doc.name = make_autoname(prefix + ".#")  # Autoname format: CD-YYYY-{MES}-#
