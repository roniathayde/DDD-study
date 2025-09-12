import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe(`Delete question`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new EditQuestionUseCase(inMemoryQuestionsRepository) // System Under Test
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID(`author-1`),
      },
      new UniqueEntityID(`question-1`),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: `author-1`,
      title: `Pergunta teste`,
      content: `Conteudo teste`,
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: `Pergunta teste`,
      content: `Conteudo teste`,
    })
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID(`author-1`),
      },
      new UniqueEntityID(`question-1`),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await expect(
      async () =>
        await sut.execute({
          questionId: newQuestion.id.toString(),
          authorId: `author-2`,
          title: `pergunta teste`,
          content: `conteudo teste`,
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
