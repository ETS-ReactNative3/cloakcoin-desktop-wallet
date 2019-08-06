// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'react-i18next'

import { truncateAmount } from '~/utils/decimal'
import { Balances } from '~/reducers/overview/overview.reducer'

import styles from './Balance.scss'
import HLayout from '~/assets/styles/h-box-layout.scss'
import ballanceUp from '~/assets/images/main/overview/ballance-up.png';
import reward from '~/assets/images/main/overview/reward.png';

type Props = {
  t: any,
	balances: Balances
}

class Balance extends Component<Props> {
	props: Props

	hasUnconfirmedTransactionBalance(balanceType) {
		const tempBalances = this.props.balances

		if (balanceType === 'transparent') {
			return tempBalances && !tempBalances.transparentBalance.equals(tempBalances.transparentUnconfirmedBalance)
    }

    if (balanceType === 'enigma') {
			return tempBalances && !tempBalances.enigmaBalance.equals(tempBalances.enigmaUnconfirmedBalance)
    }

    if (balanceType === 'total') {
			return tempBalances && !tempBalances.totalBalance.equals(tempBalances.totalUnconfirmedBalance)
		}

		return false
	}

	getBalanceValueStyles(balanceType) {
		let hasUnconfirmed = false

		if (balanceType === 'transparent') {
			hasUnconfirmed = this.hasUnconfirmedTransactionBalance(balanceType)
		} else if (balanceType === 'enigma') {
			hasUnconfirmed = this.hasUnconfirmedTransactionBalance(balanceType)
		} else if (balanceType === 'total') {
			hasUnconfirmed = this.hasUnconfirmedTransactionBalance(balanceType)
		}

		return hasUnconfirmed ? `${styles.balanceValue} ${styles.hasUnconfirmedTransactionBalance}` : `${styles.balanceValue}`
	}

	renderBalanceValue(balanceString: stirng, IsBottomDecimal: boolean ) {
		const strArr = balanceString.split('.')
		return (
			<span>
				<span className={classNames(styles.balanceFrontPart)}>{strArr[0]}</span>
				<span className={classNames(IsBottomDecimal ? styles.balanceDecimalPart : '')}>.{strArr.length > 1 ? strArr[1] : ''}</span>
			</span>
		)
	}

	render() {
    const { t } = this.props
		
		return (
			<div className={[HLayout.hBoxContainer, styles.balanceContainer].join(' ')} data-tid="balance-container">

				<div className={[styles.transparentBalance, HLayout.hBoxChild].join(' ')}>
					<div className={styles.balanceWraper}>
						<div className={styles.balanceTitle}>{t(`CLOAK Balance`)}</div>
						<div className={this.getBalanceValueStyles('transparent')}>
							<div className={styles.balanceStatus}>
								<img src={ballanceUp} alt="img" />
								<p>7 days</p>
							</div>
							<p className={styles.balance}>
								{this.renderBalanceValue(truncateAmount(this.props.balances.transparentUnconfirmedBalance), false)}
								<span className={styles.unit}>K</span>
							</p>
						</div>
					</div>
				</div>

				<div className={[styles.rewardBalance, HLayout.hBoxChild].join(' ')}>
					<div className={styles.balanceWraper}>
						<div className={styles.balanceTitle}>
							<div>{t(`Last Reward`)}</div>
							<div className={styles.rewardDate}>est. time 8h</div>
						</div>
						<div className={this.getBalanceValueStyles('enigma')}>
							<div className={styles.rewardStatus}>
								<img src={reward} alt="img" />
								<p>7 days</p>
							</div>
							<p className={styles.balance}>
								<span>+</span>
								{this.renderBalanceValue(truncateAmount(this.props.balances.enigmaUnconfirmedBalance), true)}
							</p>
						</div>
					</div>
				</div>

				<div className={[styles.totalBalance, HLayout.hBoxChild].join(' ')}>
					<div className={styles.balanceWraper}>
						<div className={styles.balanceTitle}>{t(`Total Wallet Value`)}</div>
						<div className={this.getBalanceValueStyles('total')}>
							<div className={styles.balanceStatus}>
								<img src={ballanceUp} alt="img" />
								<p>7 days</p>
							</div>
							<p className={styles.balance}>
								<span>$</span>
								{this.renderBalanceValue(truncateAmount(this.props.balances.totalUnconfirmedBalance), false)}
								<span className={styles.unit}>K</span>
							</p>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default translate('overview')(Balance)
