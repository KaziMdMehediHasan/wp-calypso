function getAccountChooserUrl( emailOrDomain, service, url ) {
	const accountChooserUrl = new URL( "https://accounts.google.com/AccountChooser" );

	accountChooserUrl.searchParams.append( "service", service );
	accountChooserUrl.searchParams.append( "continue", url );

	if ( emailOrDomain.includes( '@' ) ) {
		accountChooserUrl.searchParams.append( "Email", emailOrDomain );
	} else {
		accountChooserUrl.searchParams.append( "hd", emailOrDomain );
	}

	return accountChooserUrl.href;
}

/**
 * Generates an url pointing to Gmail.
 *
 * @param {string} emailOrDomain - email or domain name
 * @returns {string} - the corresponding url
 */
export function getGmailUrl( emailOrDomain ) {
	return getAccountChooserUrl( emailOrDomain, 'mail', 'https://mail.google.com/mail/' );
}

/**
 * Generates an url pointing to Google Calendar.
 *
 * @param {string} emailOrDomain - email or domain name
 * @returns {string} - the corresponding url
 */
export function getGoogleCalendarUrl( emailOrDomain ) {
	return getAccountChooserUrl( emailOrDomain, 'cl', 'https://calendar.google.com/calendar/' );
}

/**
 * Generates an url pointing to Google Admin.
 *
 * @param {string} emailOrDomain - email or domain name
 * @returns {string} - the corresponding url
 */
export function getGoogleAdminUrl( emailOrDomain ) {
	return getAccountChooserUrl( emailOrDomain, 'CPanel', 'https://admin.google.com/' );
}
