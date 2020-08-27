/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';

/**
 * Internal dependencies
 */
import { Button } from '@automattic/components';
import { recordTracksEvent } from 'lib/analytics/tracks';

// The react-stripe-elements PaymentRequestButtonElement cannot have its
// paymentRequest updated once it has been rendered, so this is a custom one.
// See: https://github.com/stripe/react-stripe-elements/issues/284
export default function PaymentRequestButton( {
	paymentRequest,
	isRenewal,
	paymentType,
	translate,
	disabled,
	disabledReason,
} ) {
	const [ isSubmitting, setIsSubmitting ] = useState( false );
	const onClick = ( event ) => {
		event.persist();
		event.preventDefault();
		recordTracksEvent( 'calypso_checkout_apple_pay_open_payment_sheet', {
			is_renewal: isRenewal,
		} );
		setIsSubmitting( true );
		paymentRequest.on( 'cancel', () => setIsSubmitting( false ) );
		paymentRequest.show();
	};
	if ( ! paymentRequest ) {
		disabled = true;
	}

	if ( isSubmitting ) {
		return (
			<Button
				primary
				className="web-payment-box__web-pay-button button checkout__pay-button-button button-pay pay-button__button"
				disabled
			>
				{ translate( 'Completing your purchase', { context: 'Loading state on /checkout' } ) }
			</Button>
		);
	}
	if ( disabled ) {
		return (
			<React.Fragment>
				<Button
					primary
					className="web-payment-box__web-pay-button checkout__pay-button-button button-pay pay-button__button"
					disabled
				>
					{ disabledReason }
				</Button>
			</React.Fragment>
		);
	}

	if ( paymentType === 'apple-pay' ) {
		return <Button className="payment-request-button" onClick={ onClick } />;
	}
	return (
		<Button
			primary
			className="web-payment-box__web-pay-button checkout__pay-button-button button-pay pay-button__button"
			onClick={ onClick }
		>
			{ translate( 'Select a payment card', { context: 'Loading state on /checkout' } ) }
		</Button>
	);
}

PaymentRequestButton.propTypes = {
	paymentRequest: PropTypes.object,
	isRenewal: PropTypes.bool.isRequired,
	paymentType: PropTypes.string.isRequired,
	translate: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};
