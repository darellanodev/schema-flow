import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Configuration from '../configuration'

describe('Configuration component', () => {
  it('render API Key input and theme buttons', () => {
    render(<Configuration />)

    expect(screen.getByLabelText(/API KEY/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Dark mode/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Light mode/i }),
    ).toBeInTheDocument()
  })

  it('allows user to type in API key input', () => {
    render(<Configuration />)

    const apiKeyInput = screen.getByLabelText(/API KEY/i) as HTMLInputElement
    fireEvent.change(apiKeyInput, { target: { value: 'test-key' } })

    expect(apiKeyInput.value).toBe('test-key')
  })

  it('activates dark mode by default', () => {
    render(<Configuration />)

    const darkModeButton = screen.getByRole('button', { name: /Dark mode/i })
    const lightModeButton = screen.getByRole('button', { name: /Light mode/i })

    expect(darkModeButton).toBeDisabled()
    expect(lightModeButton).toBeEnabled()
  })

  it('switches to light mode button is clicked', async () => {
    render(<Configuration />)

    const darkModeButton = screen.getByRole('button', { name: /Dark mode/i })
    const lightModeButton = screen.getByRole('button', { name: /Light mode/i })

    fireEvent.click(lightModeButton)

    await waitFor(() => {
      expect(darkModeButton).toBeEnabled()
      expect(lightModeButton).toBeDisabled()
    })
  })
})
