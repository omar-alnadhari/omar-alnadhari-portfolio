import { expect, test } from '@playwright/test';

test('homepage loads with main portfolio content', async ({ page }) => {
	await page.goto('/');

	await expect(
		page.getByRole('heading', {
			level: 1,
			name: 'Eng. Omar Al-Nadhari',
		})
	).toBeVisible();

	await expect(
		page.getByText('Software Engineer').first()
	).toBeVisible();

	await expect(
		page.locator('#projects')
	).toBeVisible();
});

test('featured project opens its case study', async ({ page }) => {
	await page.goto('/');

	await page
		.getByRole('link', { name: 'View Case Study' })
		.first()
		.click();

	await expect(page).toHaveURL(
		/projects\/developer-workspace-assistant/
	);

	await expect(
		page.getByRole('heading', {
			level: 1,
			name: 'Developer Workspace Assistant',
		})
	).toBeVisible();
});

test('resume link points to the portfolio resume', async ({ page }) => {
	await page.goto('/');

	const resume = page.getByRole('link', { name: 'Resume' }).first();

	await expect(resume).toHaveAttribute(
		'href',
		'/Omar_AlNadhari_Software_Engineer_Resume.pdf'
	);
});

test('404 page is rendered for an unknown route', async ({ page }) => {
	await page.goto('/this-page-does-not-exist');

	await expect(
		page.getByRole('heading', { name: 'Page not found.' })
	).toBeVisible();

	await expect(
		page.getByRole('link', { name: 'Back to Home' })
	).toBeVisible();
});

test('contact links are available', async ({ page }) => {
	await page.goto('/');

	await expect(
		page.getByRole('link', { name: 'Email Me' })
	).toHaveAttribute('href', 'mailto:omaryahyasaeed@gmail.com');

	await expect(
		page.getByRole('link', { name: 'GitHub' })
	).toHaveAttribute('href', 'https://github.com/omar-alnadhari');

	await expect(
		page.getByRole('link', { name: 'LinkedIn' })
	).toHaveAttribute(
		'href',
		'https://www.linkedin.com/in/omar-al-nadhari'
	);
});

test('mobile navigation opens and closes correctly', async ({ page }) => {
	await page.setViewportSize({
		width: 390,
		height: 844,
	});

	await page.goto('/');

	const menuButton = page.getByRole('button', {
		name: 'Open navigation menu',
	});

	await expect(menuButton).toBeVisible();

	await menuButton.click();

	await expect(
		page.getByRole('link', { name: 'Projects' }).last()
	).toBeVisible();

	await page.keyboard.press('Escape');

	await expect(menuButton).toHaveAttribute(
		'aria-expanded',
		'false'
	);
});