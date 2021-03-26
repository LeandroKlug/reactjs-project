import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '.'

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'titulo 1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'titulo 2',
          body: 'body2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'titulo 3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    )
  }),
]
const server = setupServer(...handlers)

describe('<Home />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => {
    server.close()
  })

  it('should render search, posts and load more', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não possuem posts!!!')
    expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/digite a pesquisa/i)
    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img', { name: /titulo/i })
    expect(images).toHaveLength(2)

    const button = screen.getByRole('button', { name: /load more/i })
    expect(button).toBeInTheDocument()
  })

  it('should search for posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não possuem posts!!!')
    // expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)
  })

  it('should load more posts click button', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não possuem posts!!!')
    // expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const button = screen.getByRole('button', { name: /load more/i })

    userEvent.click(button)

    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument()

    expect(button).toBeDisabled()
  })
})
