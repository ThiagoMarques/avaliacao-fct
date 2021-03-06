import { MensagensHandler } from 'app/shared/services/mensagens-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Atributo } from './../atributo.model';
import { Abrangencia } from './../../abrangencia/abrangencia.model';
import { Complexidade } from './../../complexidade/complexidade.model';
import { Impacto } from './../../impacto/impacto.model';
import { AtributoService } from './../atributo.service';
import { AbrangenciaService } from './../../abrangencia/abrangencia.service';
import { ComplexidadeService } from './../../complexidade/complexidade.service';
import { ImpactoService } from './../../impacto/impacto.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
	selector: 'app-atributo-form',
	templateUrl: './atributo-form.component.html',
	styleUrls: ['./atributo-form.component.css']
})
export class AtributoFormComponent implements OnInit {

	formAtributo: FormGroup;
	title: string;
	atributo: Atributo = new Atributo();
	idResource: any;
	selectedData: any[] = [];
	count = 0;

	public Abrangencia: Abrangencia[] = [];
	public Complexidade: Complexidade[] = [];
	public Impacto: Impacto[] = [];

	constructor(
		formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private _atributoService: AtributoService,
		private _abrangenciaService: AbrangenciaService,
		private _complexidadeService: ComplexidadeService,
		private _impactoService: ImpactoService,
		private loaderService: LoaderService,
		private mensagensHandler: MensagensHandler
	) {
		this.formAtributo = formBuilder.group({
			letra: [null, [Validators.required]],
			descricao: [null, Validators.required],
			TB_ABRANGENCIA_id_abrangencia: [{ value: 'null', disabled: true }],
			TB_COMPLEXIDADE_id_complexidade: [{ value: 'null', disabled: true }],
			TB_IMPACTO_id_impacto: [{ value: 'null', disabled: true }]
		});
	}

	ngOnInit() {

		this.loaderService.setMsgLoading('Carregando ...');
		this.mensagensHandler.handleClearMessages();
		this.getAbrangencia();
		this.getComplexidade();
		this.getImpacto();

		var idAtributo = this.route.params.subscribe(params => {
			this.idResource = params['id_atributo'];
			this.title = this.idResource ? 'Editar Atributo' : 'Novo Atributo';

			if (!this.idResource) {
				return;
			}

			this._atributoService.getAtributoId(this.idResource).subscribe(atributo => {
				atributo = this.atributo = atributo;

				this.habilitaCampos();

				
			});
		});
	}

	save() {

		let result, userValue = this.formAtributo.value;
		let atualizar: boolean;

		if (this.idResource) {
			atualizar = true;
			this.loaderService.setMsgLoading('Atualizando atributo ...');
			result = this._atributoService.updateAtributo(this.idResource, userValue);
		} else {
			atualizar = false;
			this.loaderService.setMsgLoading('Salvando atributo ...');
			result = this._atributoService.addAtributo(userValue);
		}

		result.subscribe(data => {
			if (atualizar) {
				this.mensagensHandler.handleSuccess('Atributo atualizado com sucesso!');
			} else {
				this.mensagensHandler.handleSuccess('Atributo salvo com sucesso!');
			}
			this.router.navigate(['atributo']);
		});
	}

	getAbrangencia() {
		this._abrangenciaService.getAbrangencia().subscribe(
			abrangencia => {
				this.Abrangencia = abrangencia;
			},
			error => {
				console.log('Error', error);
			}
		);
	}

	getComplexidade() {
		this._complexidadeService.getComplexidade().subscribe(complexidade => {
			this.Complexidade = complexidade;
		});
	}

	getImpacto() {
		this._impactoService.getImpacto().subscribe(impacto => {
			this.Impacto = impacto;
		})
	}

	onCancel() {
		this.navigateBack();
	}

	private navigateBack() {
		this.router.navigate(['/atributo']);
	}

	hasErrors(): boolean {
		let hasErrors = false;
		for (var controlName in this.formAtributo.controls) {
			var control: AbstractControl = this.formAtributo.controls[controlName];
			if (!control.valid && !control.pristine) {
				hasErrors = true;
				break;
			}
		}
		return hasErrors;
	}

	compareOptions(op1: any, op2: any): boolean {

		return op1 && op2 ? op1.TB_ABRANGENCIA_id_abrangencia === op2.id_abrangencia : op1 === op2;
	}

	habilitaCampos() {
		// Habilitando os campos de select
		this.formAtributo.get('TB_ABRANGENCIA_id_abrangencia').enable();
		this.formAtributo.get('TB_COMPLEXIDADE_id_complexidade').enable();
		this.formAtributo.get('TB_IMPACTO_id_impacto').enable();
	}

	desabilitaCampos() {
		// Habilitando os campos de select
		this.formAtributo.get('TB_ABRANGENCIA_id_abrangencia').disable();
		this.formAtributo.get('TB_COMPLEXIDADE_id_complexidade').disable();
		this.formAtributo.get('TB_IMPACTO_id_impacto').disable();
	}

	setCamposDesc(letra: string) {
		// habilitando os campos
		if (letra) {
			this.habilitaCampos();
		} else {
			this.desabilitaCampos();
		}

		switch (letra) {
			case 'a':
				{
					this.atributo.descricao = 'Analisar as demandas apresentadas pelas áreas de negócio e propor alternativas de ' +
						'solução técnica e estratégia de desenvolvimento';
					break;
				}
			case 'b':
				{
					this.atributo.descricao = 'Elicitar requisitos e criar modelos de uso e de testes de sistemas';
					break;
				}
			case 'c':
				{
					this.atributo.descricao = 'Elaborar projeto lógico e físico de dados e de sistemas';
					break;
				}
			case 'd':
				{
					this.atributo.descricao = 'Definir a arquitetura de softwares e de sistemas';
					break;
				}
			case 'e':
				{
					this.atributo.descricao = 'Especificar unidades de implementação de software';
					break;
				}
			case 'f':
				{
					this.atributo.descricao = 'Elaborar documentação relativa às etapas de desenvolvimento de sistemas';
					break;
				}
			case 'g':
				{
					this.atributo.descricao = 'Planejar, elaborar e ministrar treinamentos relativos a sistemas de informação, ferramentas de acesso e manipulação de dados';
					break;
				}
			case 'h':
				{
					this.atributo.descricao = 'Selecionar, implementar e internalizar novas tecnologias de desenvolvimento';
					break;
				}
			case 'i':
				{
					this.atributo.descricao = 'Prestar assessoramento técnico no que se refere a prazos, recursos e alternativas ' +
						'de desenvolvimento de sistemas';
					break;
				}
			case 'j':
				{
					this.atributo.descricao = 'Especificar a manutenção de softwares e de sistemas';
					break;
				}
			case 'k':
				{
					this.atributo.descricao = 'Manter os sistemas em produção, avaliando seu desempenho e, quando necessário, propondo medidas de correção dos desvios';
					break;
				}
			case 'l':
				{
					this.atributo.descricao = 'Planejar e administrar componentes reusáveis e repositórios';
					break;
				}
			case 'm':
				{
					this.atributo.descricao = 'Certificar e inspecionar modelos e códigos de sistemas';
					break;
				}
			case 'n':
				{
					this.atributo.descricao = 'Elaborar e gerenciar projetos de sistemas e software';
					break;
				}
			case 'o':
				{
					this.atributo.descricao = 'Identificar e analisar as necessidades dos clientes em relação à informações visuais relacionadas à mídia digital e/ou impressa';
					break;
				}
			case 'q':
				{
					this.atributo.descricao = 'Elaborar e implementar projetos de programação visual relacionados à mídia digital e/ou impressa';
					break;
				}
			case 'r':
				{
					this.atributo.descricao = 'Elaborar e implementar leiaute para mídia digital e/ou impressa';
					break;
				}
			case 's':
				{
					this.atributo.descricao = 'Efetuar manutenção relacionada aos elementos visuais em mídia digital e/ou impressa';
					break;
				}
			case 't':
				{
					this.atributo.descricao = 'Efetuar prospecção, análise e implementação de soluções de usabilidade e acessibilidade';
					break;
				}
			case 'u':
				{
					this.atributo.descricao = 'Definir linguagens, materiais e processos de produção a serem utilizados em mídia digital e/ou impressa';
					break;
				}
			case 'v':
				{
					this.atributo.descricao = 'Elaborar especificações técnicas e documentações necessárias à execução das atividades de programação visual';
					break;
				}
			default: {
				break;
			}
		}
	}
}
