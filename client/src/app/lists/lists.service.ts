import { Injectable } from '@angular/core'
import { WebRequestsService } from '../web-requests/web-requests.service'

@Injectable({ providedIn: 'root'})
export class ListsService {
  private webReqService: WebRequestsService

  constructor(webReqService: WebRequestsService) {
    this.webReqService = webReqService
  }

  createList(title: String) {
    return this.webReqService.post('lists', { title });
  }

  getLists() {
    return this.webReqService.get('lists')
  }

  createTask(title: String, listId: String) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  getTasks(listId: String) {
    return this.webReqService.get(`lists/${listId}/tasks`)
  }

  done(task: any) {
    return this.webReqService.patch(
      `lists/${task._listId}/tasks/${task._id}`,
      { done: !task.done }
    )
  }
}
