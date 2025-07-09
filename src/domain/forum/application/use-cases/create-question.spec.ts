import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe(`Create question`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository) // System Under Test
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: `1`,
      title: `Nova pergunta`,
      content: `Conteudo da pergunta`,
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(`Nova pergunta`)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
