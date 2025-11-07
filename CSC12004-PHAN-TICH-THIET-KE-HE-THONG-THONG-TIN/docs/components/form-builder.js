// Enhanced Form Components for Research Project Management System

class FormBuilder {
    constructor() {
        this.forms = {};
    }

    // Project Application Form
    createProjectApplicationForm(containerId, projectData = null) {
        const isEdit = projectData !== null;
        const container = document.getElementById(containerId);
        
        const formHTML = `
            <form id="projectApplicationForm" class="enhanced-form">
                <div class="form-grid">
                    <!-- Basic Information Section -->
                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-info-circle"></i> Thông tin cơ bản
                        </h4>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="projectTitle">Tên đề tài *</label>
                                <input type="text" id="projectTitle" name="projectTitle" required
                                       value="${isEdit ? projectData.ten : ''}"
                                       placeholder="Nhập tên đề tài nghiên cứu...">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="projectField">Lĩnh vực nghiên cứu *</label>
                                <select id="projectField" name="projectField" required>
                                    <option value="">Chọn lĩnh vực</option>
                                    <option value="cntt" ${isEdit && projectData.linhVuc === 'Công nghệ thông tin' ? 'selected' : ''}>
                                        Công nghệ thông tin
                                    </option>
                                    <option value="ktkt" ${isEdit && projectData.linhVuc === 'Kỹ thuật' ? 'selected' : ''}>
                                        Kỹ thuật
                                    </option>
                                    <option value="toan" ${isEdit && projectData.linhVuc === 'Toán - Tin học' ? 'selected' : ''}>
                                        Toán - Tin học
                                    </option>
                                    <option value="yhoc" ${isEdit && projectData.linhVuc === 'Y học' ? 'selected' : ''}>
                                        Y học
                                    </option>
                                    <option value="kinh-te" ${isEdit && projectData.linhVuc === 'Kinh tế' ? 'selected' : ''}>
                                        Kinh tế
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="projectDuration">Thời gian thực hiện (tháng) *</label>
                                <input type="number" id="projectDuration" name="projectDuration" 
                                       min="6" max="60" required
                                       value="${isEdit ? projectData.thoiGian : ''}"
                                       placeholder="Ví dụ: 24">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="projectBudget">Kinh phí đề xuất (VNĐ) *</label>
                                <input type="number" id="projectBudget" name="projectBudget" 
                                       min="0" step="1000000" required
                                       value="${isEdit ? projectData.kinhPhi : ''}"
                                       placeholder="Ví dụ: 500000000">
                            </div>
                            
                            <div class="form-group">
                                <label for="projectPriority">Mức độ ưu tiên</label>
                                <select id="projectPriority" name="projectPriority">
                                    <option value="low" ${isEdit && projectData.priority === 'low' ? 'selected' : ''}>
                                        Thông thường
                                    </option>
                                    <option value="medium" ${isEdit && projectData.priority === 'medium' ? 'selected' : ''}>
                                        Ưu tiên
                                    </option>
                                    <option value="high" ${isEdit && projectData.priority === 'high' ? 'selected' : ''}>
                                        Khẩn cấp
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Project Description Section -->
                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-file-alt"></i> Mô tả đề tài
                        </h4>
                        
                        <div class="form-group">
                            <label for="projectSummary">Tóm tắt đề tài *</label>
                            <textarea id="projectSummary" name="projectSummary" rows="4" required
                                     placeholder="Mô tả tóm tắt về mục tiêu và nội dung chính của đề tài...">${isEdit ? (projectData.tomTat || '') : ''}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="projectObjectives">Mục tiêu nghiên cứu *</label>
                            <textarea id="projectObjectives" name="projectObjectives" rows="3" required
                                     placeholder="Liệt kê các mục tiêu cụ thể của đề tài...">${isEdit ? (projectData.mucTieu || '') : ''}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="projectMethod">Phương pháp nghiên cứu *</label>
                            <textarea id="projectMethod" name="projectMethod" rows="3" required
                                     placeholder="Mô tả phương pháp và cách tiếp cận nghiên cứu...">${isEdit ? (projectData.phuongPhap || '') : ''}</textarea>
                        </div>
                    </div>

                    <!-- Team Members Section -->
                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-users"></i> Thành viên tham gia
                        </h4>
                        
                        <div id="teamMembers">
                            ${this.generateTeamMemberFields(isEdit ? projectData.thanhVien : [])}
                        </div>
                        
                        <button type="button" class="enhanced-btn btn-secondary" onclick="addTeamMember()">
                            <i class="fas fa-plus"></i> Thêm thành viên
                        </button>
                    </div>

                    <!-- Document Upload Section -->
                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-upload"></i> Tài liệu đính kèm
                        </h4>
                        
                        <div class="document-upload-grid">
                            <div class="upload-item">
                                <label for="decuong">Đề cương nghiên cứu *</label>
                                <input type="file" id="decuong" name="decuong" accept=".pdf,.doc,.docx" required>
                                <small>Định dạng: PDF, DOC, DOCX. Tối đa 10MB</small>
                            </div>
                            
                            <div class="upload-item">
                                <label for="thuyetminh">Thuyết minh đề tài *</label>
                                <input type="file" id="thuyetminh" name="thuyetminh" accept=".pdf,.doc,.docx" required>
                                <small>Định dạng: PDF, DOC, DOCX. Tối đa 10MB</small>
                            </div>
                            
                            <div class="upload-item">
                                <label for="kehoach">Kế hoạch triển khai *</label>
                                <input type="file" id="kehoach" name="kehoach" accept=".pdf,.doc,.docx" required>
                                <small>Định dạng: PDF, DOC, DOCX. Tối đa 10MB</small>
                            </div>
                            
                            <div class="upload-item">
                                <label for="tailieu-khac">Tài liệu khác</label>
                                <input type="file" id="tailieu-khac" name="tailieu-khac" 
                                       accept=".pdf,.doc,.docx,.zip" multiple>
                                <small>Có thể chọn nhiều file. Tối đa 20MB</small>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="form-actions">
                        <button type="button" class="enhanced-btn btn-secondary" onclick="resetForm()">
                            <i class="fas fa-undo"></i> Đặt lại
                        </button>
                        <button type="button" class="enhanced-btn btn-warning" onclick="saveAsDraft()">
                            <i class="fas fa-save"></i> Lưu nháp
                        </button>
                        <button type="submit" class="enhanced-btn btn-primary">
                            <i class="fas fa-paper-plane"></i> ${isEdit ? 'Cập nhật' : 'Gửi hồ sơ'}
                        </button>
                    </div>
                </div>
            </form>
        `;

        container.innerHTML = formHTML;
        this.attachFormHandlers('projectApplicationForm');
    }

    // Progress Report Form
    createProgressReportForm(containerId, projectId, period) {
        const container = document.getElementById(containerId);
        
        const formHTML = `
            <form id="progressReportForm" class="enhanced-form">
                <input type="hidden" name="projectId" value="${projectId}">
                <input type="hidden" name="period" value="${period}">
                
                <div class="form-grid">
                    <div class="alert info">
                        <i class="fas fa-info-circle"></i>
                        Báo cáo tiến độ kỳ ${period} cho đề tài mã số: <strong>${projectId}</strong>
                    </div>

                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-tasks"></i> Công việc đã thực hiện
                        </h4>
                        
                        <div class="form-group">
                            <label for="completedTasks">Các công việc đã hoàn thành *</label>
                            <textarea id="completedTasks" name="completedTasks" rows="5" required
                                     placeholder="Mô tả chi tiết các công việc đã thực hiện trong kỳ báo cáo này..."></textarea>
                        </div>

                        <div class="form-group">
                            <label for="achievements">Kết quả đạt được *</label>
                            <textarea id="achievements" name="achievements" rows="4" required
                                     placeholder="Liệt kê các kết quả cụ thể đã đạt được..."></textarea>
                        </div>
                    </div>

                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-exclamation-triangle"></i> Đánh giá và kế hoạch
                        </h4>
                        
                        <div class="form-group">
                            <label for="difficulties">Khó khăn phát sinh</label>
                            <textarea id="difficulties" name="difficulties" rows="3"
                                     placeholder="Mô tả các khó khăn gặp phải (nếu có)..."></textarea>
                        </div>

                        <div class="form-group">
                            <label for="nextPlan">Kế hoạch kỳ tiếp theo *</label>
                            <textarea id="nextPlan" name="nextPlan" rows="4" required
                                     placeholder="Kế hoạch công việc cho kỳ báo cáo tiếp theo..."></textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="progressPercentage">Tiến độ hoàn thành (%)</label>
                                <input type="range" id="progressPercentage" name="progressPercentage" 
                                       min="0" max="100" value="${period * 25}" 
                                       oninput="updateProgressDisplay(this.value)">
                                <div class="progress-display">
                                    <span id="progressValue">${period * 25}%</span>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="budgetUsed">Ngân sách đã sử dụng (%)</label>
                                <input type="number" id="budgetUsed" name="budgetUsed" 
                                       min="0" max="100" step="0.1"
                                       placeholder="Ví dụ: 25.5">
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-paperclip"></i> Tài liệu đính kèm
                        </h4>
                        
                        <div class="upload-item">
                            <label for="reportFiles">Báo cáo chi tiết và tài liệu minh chứng</label>
                            <input type="file" id="reportFiles" name="reportFiles" 
                                   accept=".pdf,.doc,.docx,.zip" multiple>
                            <small>Có thể chọn nhiều file. Định dạng: PDF, DOC, DOCX, ZIP</small>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="enhanced-btn btn-secondary" onclick="cancelProgressReport()">
                            <i class="fas fa-times"></i> Hủy bỏ
                        </button>
                        <button type="button" class="enhanced-btn btn-warning" onclick="saveProgressDraft()">
                            <i class="fas fa-save"></i> Lưu nháp
                        </button>
                        <button type="submit" class="enhanced-btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Gửi báo cáo
                        </button>
                    </div>
                </div>
            </form>
        `;

        container.innerHTML = formHTML;
        this.attachFormHandlers('progressReportForm');
    }

    // Evaluation Form for Council/Acceptance Testing
    createEvaluationForm(containerId, projectData, evaluationType = 'council') {
        const container = document.getElementById(containerId);
        const isAcceptance = evaluationType === 'acceptance';
        
        const criteriaConfig = isAcceptance ? 
            this.getAcceptanceCriteria() : 
            this.getCouncilCriteria();

        const formHTML = `
            <form id="evaluationForm" class="enhanced-form">
                <input type="hidden" name="projectId" value="${projectData.id}">
                <input type="hidden" name="evaluationType" value="${evaluationType}">
                
                <div class="form-grid">
                    <!-- Project Information -->
                    <div class="project-info-section">
                        <h4 class="section-title">
                            <i class="fas fa-project-diagram"></i> Thông tin đề tài
                        </h4>
                        
                        <div class="info-grid">
                            <div><strong>Mã đề tài:</strong> ${projectData.id}</div>
                            <div><strong>Tên đề tài:</strong> ${projectData.ten}</div>
                            <div><strong>Chủ nhiệm:</strong> ${projectData.nguoiDeXuat}</div>
                            <div><strong>Lĩnh vực:</strong> ${projectData.linhVuc}</div>
                            <div><strong>Kinh phí:</strong> ${this.formatCurrency(projectData.kinhPhi)}</div>
                            <div><strong>Thời gian:</strong> ${projectData.thoiGian} tháng</div>
                        </div>
                    </div>

                    <!-- Evaluation Criteria -->
                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-clipboard-check"></i> Tiêu chí đánh giá
                        </h4>
                        
                        <div class="criteria-grid">
                            ${criteriaConfig.map((criterion, index) => `
                                <div class="criterion-item">
                                    <label>${index + 1}. ${criterion.name} (0-${criterion.maxScore} điểm)</label>
                                    <div class="criterion-score">
                                        <input type="range" id="criterion_${index}" 
                                               name="criterion_${index}" 
                                               min="0" max="${criterion.maxScore}" 
                                               value="${Math.floor(criterion.maxScore / 2)}"
                                               oninput="updateCriterionScore(${index}, this.value, ${criterion.maxScore})">
                                        <span id="score_${index}" class="score-display">
                                            ${Math.floor(criterion.maxScore / 2)}
                                        </span>
                                    </div>
                                    <small class="criterion-description">${criterion.description}</small>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Total Score Display -->
                        <div class="total-score-section">
                            <div class="total-score-card">
                                <h5>Tổng điểm đánh giá</h5>
                                <div id="totalScore" class="total-score-number">
                                    ${criteriaConfig.reduce((sum, c) => sum + Math.floor(c.maxScore / 2), 0)}
                                </div>
                                <div class="total-score-max">
                                    / ${criteriaConfig.reduce((sum, c) => sum + c.maxScore, 0)} điểm
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Comments Section -->
                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-comment-alt"></i> Nhận xét và đánh giá
                        </h4>
                        
                        <div class="form-group">
                            <label for="evaluationComments">Nhận xét chi tiết *</label>
                            <textarea id="evaluationComments" name="evaluationComments" rows="5" required
                                     placeholder="Nhập nhận xét chi tiết về đề tài, điểm mạnh, điểm yếu và các đề xuất..."></textarea>
                        </div>

                        <div class="form-group">
                            <label for="recommendations">Đề xuất cải thiện</label>
                            <textarea id="recommendations" name="recommendations" rows="3"
                                     placeholder="Các đề xuất cụ thể để cải thiện đề tài (nếu có)..."></textarea>
                        </div>
                    </div>

                    <!-- Decision Section -->
                    <div class="form-section">
                        <h4 class="section-title">
                            <i class="fas fa-gavel"></i> Quyết định ${isAcceptance ? 'nghiệm thu' : 'xét duyệt'}
                        </h4>
                        
                        <div class="decision-grid">
                            ${isAcceptance ? `
                                <label class="decision-option">
                                    <input type="radio" name="decision" value="excellent" required>
                                    <div class="option-content">
                                        <div class="option-title">
                                            <i class="fas fa-star"></i> Xuất sắc
                                        </div>
                                        <div class="option-desc">Điểm số: 90-100</div>
                                    </div>
                                </label>
                                
                                <label class="decision-option">
                                    <input type="radio" name="decision" value="good" required>
                                    <div class="option-content">
                                        <div class="option-title">
                                            <i class="fas fa-thumbs-up"></i> Tốt
                                        </div>
                                        <div class="option-desc">Điểm số: 75-89</div>
                                    </div>
                                </label>
                                
                                <label class="decision-option">
                                    <input type="radio" name="decision" value="passed" required>
                                    <div class="option-content">
                                        <div class="option-title">
                                            <i class="fas fa-check"></i> Đạt
                                        </div>
                                        <div class="option-desc">Điểm số: 60-74</div>
                                    </div>
                                </label>
                                
                                <label class="decision-option">
                                    <input type="radio" name="decision" value="failed" required>
                                    <div class="option-content">
                                        <div class="option-title">
                                            <i class="fas fa-times"></i> Không đạt
                                        </div>
                                        <div class="option-desc">Điểm số: < 60</div>
                                    </div>
                                </label>
                            ` : `
                                <label class="decision-option">
                                    <input type="radio" name="decision" value="approved" required>
                                    <div class="option-content">
                                        <div class="option-title">
                                            <i class="fas fa-check-circle"></i> Phê duyệt
                                        </div>
                                        <div class="option-desc">Đề tài đạt yêu cầu</div>
                                    </div>
                                </label>
                                
                                <label class="decision-option">
                                    <input type="radio" name="decision" value="revision" required>
                                    <div class="option-content">
                                        <div class="option-title">
                                            <i class="fas fa-edit"></i> Yêu cầu chỉnh sửa
                                        </div>
                                        <div class="option-desc">Cần sửa đổi một số nội dung</div>
                                    </div>
                                </label>
                                
                                <label class="decision-option">
                                    <input type="radio" name="decision" value="rejected" required>
                                    <div class="option-content">
                                        <div class="option-title">
                                            <i class="fas fa-times-circle"></i> Từ chối
                                        </div>
                                        <div class="option-desc">Đề tài không đạt yêu cầu</div>
                                    </div>
                                </label>
                            `}
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="enhanced-btn btn-secondary" onclick="cancelEvaluation()">
                            <i class="fas fa-times"></i> Hủy bỏ
                        </button>
                        <button type="button" class="enhanced-btn btn-warning" onclick="saveEvaluationDraft()">
                            <i class="fas fa-save"></i> Lưu nháp
                        </button>
                        <button type="submit" class="enhanced-btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Gửi đánh giá
                        </button>
                    </div>
                </div>
            </form>
        `;

        container.innerHTML = formHTML;
        this.attachFormHandlers('evaluationForm');
    }

    // Helper methods
    generateTeamMemberFields(members = []) {
        if (members.length === 0) {
            members = [{ name: '', position: '', qualification: '' }];
        }

        return members.map((member, index) => `
            <div class="team-member-row" id="member_${index}">
                <div class="form-row">
                    <div class="form-group">
                        <label>Họ và tên</label>
                        <input type="text" name="memberName_${index}" 
                               value="${member.name || ''}"
                               placeholder="Nhập họ và tên...">
                    </div>
                    <div class="form-group">
                        <label>Chức vụ</label>
                        <input type="text" name="memberPosition_${index}" 
                               value="${member.position || ''}"
                               placeholder="Ví dụ: Nghiên cứu viên">
                    </div>
                    <div class="form-group">
                        <label>Trình độ</label>
                        <input type="text" name="memberQualification_${index}" 
                               value="${member.qualification || ''}"
                               placeholder="Ví dụ: Thạc sĩ">
                    </div>
                    ${index > 0 ? `
                        <div class="form-group">
                            <button type="button" class="enhanced-btn btn-danger btn-sm" 
                                    onclick="removeTeamMember(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    getCouncilCriteria() {
        return [
            { name: 'Tính mới và sáng tạo của đề tài', maxScore: 10, description: 'Đánh giá tính mới, độc đáo và sáng tạo' },
            { name: 'Tính khả thi và phương pháp nghiên cứu', maxScore: 10, description: 'Phương pháp và khả năng thực hiện' },
            { name: 'Ý nghĩa khoa học và thực tiễn', maxScore: 10, description: 'Giá trị khoa học và ứng dụng thực tế' },
            { name: 'Năng lực và kinh nghiệm nhóm nghiên cứu', maxScore: 10, description: 'Trình độ và kinh nghiệm của nhóm' },
            { name: 'Kinh phí và thời gian thực hiện', maxScore: 10, description: 'Tính hợp lý của ngân sách và kế hoạch' }
        ];
    }

    getAcceptanceCriteria() {
        return [
            { name: 'Mức độ hoàn thành các mục tiêu đề ra', maxScore: 20, description: 'Đánh giá việc thực hiện các mục tiêu ban đầu' },
            { name: 'Chất lượng kết quả nghiên cứu', maxScore: 20, description: 'Chất lượng và giá trị của kết quả' },
            { name: 'Tính ứng dụng và tác động thực tiễn', maxScore: 15, description: 'Khả năng ứng dụng trong thực tế' },
            { name: 'Chất lượng báo cáo và trình bày', maxScore: 15, description: 'Độ rõ ràng và chuyên nghiệp của báo cáo' },
            { name: 'Tính đổi mới và đóng góp khoa học', maxScore: 15, description: 'Những đổi mới và đóng góp mới' },
            { name: 'Hiệu quả sử dụng kinh phí và thời gian', maxScore: 15, description: 'Tính hiệu quả trong quản lý dự án' }
        ];
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }

    attachFormHandlers(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }

    handleFormSubmit(form) {
        // Override in specific implementations
        console.log('Form submitted:', form.id);
    }
}

// Global form builder instance
window.formBuilder = new FormBuilder();

// Global helper functions
function addTeamMember() {
    const container = document.getElementById('teamMembers');
    const memberCount = container.querySelectorAll('.team-member-row').length;
    
    const newMemberHTML = window.formBuilder.generateTeamMemberFields([
        { name: '', position: '', qualification: '' }
    ]);
    
    container.insertAdjacentHTML('beforeend', newMemberHTML.replace(/member_0/g, `member_${memberCount}`));
}

function removeTeamMember(index) {
    const memberRow = document.getElementById(`member_${index}`);
    if (memberRow) {
        memberRow.remove();
    }
}

function updateProgressDisplay(value) {
    const displayElement = document.getElementById('progressValue');
    if (displayElement) {
        displayElement.textContent = `${value}%`;
    }
}

function updateCriterionScore(index, value, maxScore) {
    const scoreDisplay = document.getElementById(`score_${index}`);
    if (scoreDisplay) {
        scoreDisplay.textContent = value;
    }
    
    // Update total score
    const totalScoreElement = document.getElementById('totalScore');
    if (totalScoreElement) {
        let total = 0;
        const criteria = document.querySelectorAll('[name^="criterion_"]');
        criteria.forEach(criterion => {
            total += parseInt(criterion.value) || 0;
        });
        totalScoreElement.textContent = total;
    }
}
