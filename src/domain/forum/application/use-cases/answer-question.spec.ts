import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe(`Create Answer`, () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository) // System Under Test
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: `1`,
      instructorId: `Nova pergunta`,
      content: `Conteudo da pergunta`,
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual(`Conteudo da pergunta`)
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
