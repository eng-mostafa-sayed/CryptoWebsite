import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminDashboardService } from '../admin-dashboard.service';
import { RequestNew } from '../models/req-new.model';
import { RequestApproved } from '../models/req-approved.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  selectedTap = 'tap1';
  newRequests: RequestNew[] = [];
  approvedRequests: RequestApproved[] = [];
  newRequestsLength: number;
  approvedRequestsLength: number;
  acceptForm: FormGroup;
  acceptFormOpend = false;
  endConfirmOpend = false;
  selectedRequest: RequestNew;
  selectedApprovedRequest: RequestApproved;

  constructor(
    private dashboardService: AdminDashboardService,
    private sharedSerivce: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedSerivce.isLoading.next(true);
    this.dashboardService.getRequests().subscribe({
      next: (res) => {
        this.newRequests = res;
        this.newRequestsLength = this.newRequests.length;
        this.sharedSerivce.isLoading.next(false);
      },
    });
    this.acceptForm = new FormGroup({
      address: new FormControl(null),
      workerID: new FormControl(null),
    });
    this.dashboardService.getApprovedRequests().subscribe({
      next: (res) => {
        this.approvedRequests = res;
        this.approvedRequestsLength = this.approvedRequests.length;

        this.sharedSerivce.isLoading.next(false);
      },
    });
  }
  //it gets the selected request and opens the form
  selectReqNew(request: RequestNew) {
    this.sharedSerivce.isLoading.next(true);
    if (request._id) {
      this.selectedRequest = request;
    }
    this.dashboardService.getAddress(request.asicID).subscribe({
      next: (res) => {
        this.acceptForm.setValue({
          address: res.address,
          workerID: '',
        });
        this.acceptFormOpend = true;
        this.sharedSerivce.isLoading.next(false);
      },
    });
  }
  // the final request on the form
  onAcceptReq() {
    if (this.acceptForm.valid) {
      const address: string = this.acceptForm.value.address;
      const workerID: string = this.acceptForm.value.workerID;
      this.dashboardService
        .acceptRequest(this.selectedRequest._id, address, workerID)
        .subscribe({
          next: () => {
            // delete the request from the biew
            const updatedInedx = this.newRequests.findIndex((e) => {
              return e._id == this.selectedRequest._id;
            });
            if (updatedInedx > -1) {
              this.newRequests.splice(updatedInedx, 1);
              this.newRequestsLength = this.newRequests.length;
            }
            this.newRequests[updatedInedx] = this.selectedRequest;
            // update the view of the approved requests
            const newApproved: RequestApproved = {
              ...this.selectedRequest,
              address: address,
              workerID: workerID,
            };
            this.approvedRequests.push(newApproved);
            this.approvedRequestsLength = this.approvedRequests.length;
            this.acceptFormOpend = false;
            this.sharedSerivce.sentMessage.next('Contract has been approved');
          },
        });
    }
  }
  selectReqApproved(request: RequestApproved) {
    this.selectedApprovedRequest = request;
    this.endConfirmOpend = true;
  }
  onEndContract() {
    this.dashboardService
      .endContract(this.selectedApprovedRequest._id)
      .subscribe({
        next: (res: any) => {
          // delete the request from the biew
          const updatedInedx = this.approvedRequests.findIndex((e) => {
            return e._id == this.selectedApprovedRequest._id;
          });
          if (updatedInedx > -1) {
            this.approvedRequests.splice(updatedInedx, 1);
            this.approvedRequestsLength = this.approvedRequests.length;
          }
          this.endConfirmOpend = false;
          this.sharedSerivce.sentMessage.next('Contract has been ended');
        },
      });
  }
}
