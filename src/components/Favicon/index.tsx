import { useEffect } from 'react';
import { useReliability } from '../../store/reliability.ts';

export default function Favicon() {
	const { reliabilityState } = useReliability();

	useEffect(() => {
		if (!reliabilityState.reliability_index) return;

		const color = {
			LOW: '#fb2c36',
			HIGH: '#00c951',
			MEDIUM: '#f0b100',
			NONE: '#99a1af',
		}[reliabilityState.score_band];

		const svg = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60">
				<path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#99a1af" stroke-width="10" stroke-linecap="round" />
				<path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="${100 - reliabilityState.reliability_index}" />
				<text x="50" y="55" text-anchor="middle" font-size="40" font-family="Arial, sans-serif" font-weight="600" fill="#99a1af">${reliabilityState.reliability_index}</text>
			</svg>
		`;

		let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

		if (!link) {
			link = document.createElement('link');
			link.rel = 'icon';
			document.head.appendChild(link);
		}

		link.type = 'image/svg+xml';
		link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
	}, [reliabilityState]);

	return null;
}
